import type {
    WhmcsGetProductsResponse,
    WhmcsProduct,
    CleanProduct,
    CleanPricing,
    BillingCycle,
    ProductGroup,
    WhmcsGetTldPricingResponse,
    TldPricing,
    DomainWhoisResponse,
} from "@/lib/types/whmcs.types";

// ─────────────────────────────────────────────
// Configuration (server-only)
// ─────────────────────────────────────────────

const WHMCS_BASE_URL = process.env.WHMCS_BASE_URL ?? "";
const WHMCS_API_IDENTIFIER = process.env.WHMCS_API_IDENTIFIER ?? "";
const WHMCS_API_SECRET = process.env.WHMCS_API_SECRET ?? "";

const API_ENDPOINT = `${WHMCS_BASE_URL}/includes/api.php`;

// ─────────────────────────────────────────────
// Base API caller
// ─────────────────────────────────────────────

/**
 * Send a POST request to the WHMCS API.
 * All calls include authentication and request JSON responses.
 */
async function callWhmcsApi<T>(
    action: string,
    params: Record<string, string | number> = {}
): Promise<T> {
    const body = new URLSearchParams({
        action,
        identifier: WHMCS_API_IDENTIFIER,
        secret: WHMCS_API_SECRET,
        responsetype: "json",
        ...Object.fromEntries(
            Object.entries(params).map(([k, v]) => [k, String(v)])
        ),
    });


    const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        // Use ISR (Incremental Static Regeneration)
        // Revalidate every hour (3600 seconds)
        next: { revalidate: 3600 },
    });


    if (!response.ok) {
        const rawBody = await response.text();
        console.error("[WHMCS] Raw error response body:", rawBody);
        throw new Error(
            `WHMCS API request failed: ${response.status} ${response.statusText} | Body: ${rawBody}`
        );
    }

    return response.json() as Promise<T>;
}

// ─────────────────────────────────────────────
// Pricing helpers
// ─────────────────────────────────────────────

/** Billing cycle names mapped to setup fee keys and recurring keys */
const BILLING_CYCLES = [
    { cycle: "monthly", setupKey: "msetupfee" },
    { cycle: "quarterly", setupKey: "qsetupfee" },
    { cycle: "semiannually", setupKey: "ssetupfee" },
    { cycle: "annually", setupKey: "asetupfee" },
    { cycle: "biennially", setupKey: "bsetupfee" },
    { cycle: "triennially", setupKey: "tsetupfee" },
] as const;

/**
 * Clean raw WHMCS pricing into a frontend-friendly format.
 * Filters out cycles with "-1.00" (disabled) prices.
 */
function cleanPricing(rawPricing: WhmcsProduct["pricing"]): CleanPricing[] {
    return Object.entries(rawPricing).map(([currency, values]) => {
        const cycles: BillingCycle[] = BILLING_CYCLES
            .filter((bc) => values[bc.cycle] !== "-1.00")
            .map((bc) => ({
                cycle: bc.cycle,
                price: values[bc.cycle],
                setupFee: values[bc.setupKey],
            }));

        return {
            currency,
            prefix: values.prefix,
            suffix: values.suffix,
            cycles,
        };
    });
}

/**
 * Strip HTML tags from a string (for product descriptions).
 */
function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * Transform a raw WHMCS product into a clean frontend shape.
 */
function cleanProduct(raw: WhmcsProduct): CleanProduct {
    return {
        pid: raw.pid,
        gid: raw.gid,
        name: raw.name,
        slug: raw.slug,
        description: raw.description,
        type: raw.type,
        paytype: raw.paytype,
        productUrl: `${WHMCS_BASE_URL}/cart.php?a=add&pid=${raw.pid}`,
        pricing: cleanPricing(raw.pricing),
    };
}

// ─────────────────────────────────────────────
// Public API Methods
// ─────────────────────────────────────────────

/**
 * Fetch all WHMCS products (optionally filtered by group ID).
 *
 * @param gid  Optional product group ID to filter by
 * @returns    Array of cleaned products
 */
export async function getProducts(gid?: number): Promise<CleanProduct[]> {
    const params: Record<string, string | number> = {};
    if (gid !== undefined) {
        params.gid = gid;
    }

    const data = await callWhmcsApi<WhmcsGetProductsResponse>(
        "GetProducts",
        params
    );

    if (data.result !== "success") {
        throw new Error(data.message ?? "Failed to fetch products from WHMCS");
    }

    const rawProducts = data.products?.product ?? [];
    // console.log("rawProducts", rawProducts);
    return rawProducts.map(cleanProduct);
}

/**
 * Fetch products by a specific group ID.
 *
 * @param gid  The product group ID
 * @returns    Array of cleaned products in that group
 */
export async function getProductsByGroup(gid: number): Promise<CleanProduct[]> {
    return getProducts(gid);
}

/**
 * Fetch specific products by their IDs.
 *
 * @param pids  Array of product IDs
 * @returns     Array of cleaned products, in the order of input PIDs
 */
export async function getProductsByPids(pids: number[]): Promise<CleanProduct[]> {
    const results = await Promise.allSettled(
        pids.map(pid => callWhmcsApi<WhmcsGetProductsResponse>("GetProducts", { pid }))
    );

    const products: CleanProduct[] = [];
    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status === "fulfilled" && result.value.result === "success") {
            const raw = result.value.products?.product?.[0];
            if (raw) {
                products.push(cleanProduct(raw));
            }
        } else {
            console.error(`[WHMCS] Failed to fetch product pid=${pids[i]}`);
        }
    }

    return products;
}

/**
 * Fetch all products and group them by their group ID.
 * Useful for building a page that displays multiple product categories.
 *
 * @returns  Array of ProductGroup objects
 */
export async function getProductsGrouped(): Promise<ProductGroup[]> {
    const products = await getProducts();

    // Group products by gid
    const groupMap = new Map<number, CleanProduct[]>();
    for (const product of products) {
        const existing = groupMap.get(product.gid) ?? [];
        existing.push(product);
        groupMap.set(product.gid, existing);
    }

    // Convert to ProductGroup array
    const groups: ProductGroup[] = [];
    for (const [gid, groupProducts] of groupMap) {
        groups.push({
            gid,
            // Use the first product's group-level info as a best-effort group name
            // WHMCS GetProducts doesn't return group names directly
            groupName: `Group ${gid}`,
            products: groupProducts,
        });
    }

    return groups;
}

// ─────────────────────────────────────────────
// Named-group fetcher
// ─────────────────────────────────────────────

/** Input shape: the WHMCS group ID + the display name you want to show in the UI. */
export interface GroupConfig {
    gid: number;
    groupName: string;
}

/**
 * Fetch products for a specific set of WHMCS product groups using
 * caller-supplied display names (WHMCS GetProducts doesn't return group names).
 *
 * All groups are fetched **in parallel**. If one group fails, the rest still
 * succeed — the failed group is logged and omitted from the result.
 *
 * @param groupConfigs  Array of { gid, groupName } that defines which groups
 *                      to fetch and what to label them in the UI.
 * @returns             Array of ProductGroup objects, in input order,
 *                      with empty or failed groups omitted.
 *
 * @example
 * const groups = await getProductGroupsByConfig([
 *   { gid: 1, groupName: 'Web Hosting' },
 *   { gid: 2, groupName: 'WordPress Hosting' },
 *   { gid: 3, groupName: 'Cloud VPS' },
 *   { gid: 4, groupName: 'Business Hosting' },
 * ]);
 */
export async function getProductGroupsByConfig(
    groupConfigs: GroupConfig[]
): Promise<ProductGroup[]> {
    const results = await Promise.allSettled(
        groupConfigs.map(async ({ gid, groupName }) => {
            const products = await getProducts(gid);
            return { gid, groupName, products } satisfies ProductGroup;
        })
    );

    const groups: ProductGroup[] = [];
    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status === "fulfilled") {
            if (result.value.products.length > 0) {
                groups.push(result.value);
            }
        } else {
            console.error(
                `[WHMCS] Failed to fetch group gid=${groupConfigs[i].gid} ("${groupConfigs[i].groupName}"):`,
                result.reason
            );
        }
    }

    return groups;
}

// ─────────────────────────────────────────────
// Domain Methods
// ─────────────────────────────────────────────

/**
 * Fetch all TLD prices from WHMCS.
 */
export async function getTldPricing(): Promise<{
    currency: WhmcsGetTldPricingResponse["currency"];
    tlds: TldPricing[];
}> {
    const data = await callWhmcsApi<WhmcsGetTldPricingResponse>("GetTLDPricing");

    if (data.result !== "success") {
        throw new Error(data.message ?? "Failed to fetch TLD pricing from WHMCS");
    }

    // console.log(data.pricing);
    const tlds: TldPricing[] = Object.entries(data.pricing).map(([ext, prices]) => ({
        extension: ext,
        register: prices.register,
        transfer: prices.transfer,
        renew: prices.renew,
        categories: prices.categories,
        addons: prices.addons,
        group: prices.group,
        grace_period: prices.grace_period,
        grace_period_days: prices.grace_period_days,
        grace_period_fee: prices.grace_period_fee,
        redemption_period: prices.redemption_period,
    }));

    return {
        currency: data.currency,
        tlds,
    };
}

/**
 * Check if a domain is available.
 */
export async function checkDomainAvailability(domain: string): Promise<DomainWhoisResponse> {
    const data = await callWhmcsApi<DomainWhoisResponse>("DomainWhois", { domain });

    // WHMCS DomainWhois returns result as 'available' or 'unavailable' in some versions, 
    // or 'success' with a status field.
    if (data.result === "error") {
        throw new Error(data.message ?? "Failed to check domain availability");
    }

    return data;
}
