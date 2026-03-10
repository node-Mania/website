require('dotenv').config({ path: '.env.local' });

async function check() {
    const WHMCS_BASE_URL = process.env.WHMCS_BASE_URL ?? "";
    const WHMCS_API_IDENTIFIER = process.env.WHMCS_API_IDENTIFIER ?? "";
    const WHMCS_API_SECRET = process.env.WHMCS_API_SECRET ?? "";
    const API_ENDPOINT = `${WHMCS_BASE_URL}/includes/api.php`;

    const body = new URLSearchParams({
        action: "GetProducts",
        identifier: WHMCS_API_IDENTIFIER,
        secret: WHMCS_API_SECRET,
        responsetype: "json",
        pid: "27"
    });

    const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
    });

    const data = await res.json();
    console.log(JSON.stringify(data.products.product[0].pricing, null, 2));
}

check().catch(console.error);
