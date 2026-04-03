import { NextRequest, NextResponse } from "next/server";
import { OpenRouter } from "@openrouter/sdk";
import { checkDomainAvailability } from "@/lib/services/whmcs.service";
import { DomainWhoisResponse } from "@/lib/types/whmcs.types";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const rawDomain = searchParams.get("domain");

        if (!rawDomain) {
            return NextResponse.json(
                { success: false, error: "Domain parameter is required" },
                { status: 400 }
            );
        }

        const pageParam = searchParams.get("page");
        const page = pageParam ? parseInt(pageParam, 10) : 1;
        const pageSize = 8; // Number of suggestions per page
        const exactOnly = searchParams.get("exactOnly") === "true";

        // Clean domain Input
        let pDomain = rawDomain.trim().toLowerCase()
            .replace(/^https?:\/\//, '')
            .replace(/^www\./, '')
            .replace(/[^a-z0-9.-]/g, '');

        let baseName = pDomain;
        let tld = '.com';

        if (pDomain.includes('.')) {
            const parts = pDomain.split('.');
            tld = '.' + parts.slice(1).join('.');
            baseName = parts[0];
        } else {
            pDomain = pDomain + '.com';
        }

        if (exactOnly) {
            try {
                const res = await checkDomainAvailability(pDomain);
                return NextResponse.json(
                    { success: true, target: { ...res, domain: pDomain }, suggestions: [], hasMore: false },
                    { status: 200, headers: { "Cache-Control": "public, s-maxage=0, no-cache" } }
                );
            } catch (e: any) {
                return NextResponse.json(
                    { success: true, target: { result: "error", status: "error", domain: pDomain, message: e.message }, suggestions: [], hasMore: false },
                    { status: 200 }
                );
            }
        }

        const fallbackTlds = ['.net', '.org', '.co', '.io', '.me', '.biz', '.info', '.us', '.shop', '.store', '.online', '.tech', '.site', '.app'];
        const prefixes = ['get', 'my', 'the', 'go', 'try', 'use', 'join', 'hello'];
        const suffixes = ['app', 'hq', 'online', 'inc', 'co', 'web', 'hub', 'suite', 'portal'];

        const allSuggestions = new Set<string>();

        // 1. Prioritize AI Generated Suggestions on exact search if API key exists
        if (process.env.OPENROUTER_API_KEY && page === 1) {
            try {
                const orClient = new OpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
                const aiModel = process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.3-70b-instruct:free";

                const response = await orClient.chat.send({
                    chatRequest: {
                        model: aiModel,
                        messages: [{
                            role: "user",
                            content: `You are a domain name API. Output ONLY a valid JSON array of 5 highly creative domain names related to "${baseName}". No other text whatsoever.`
                        }]
                    }
                });

                const rawContent = response.choices[0]?.message?.content ?? "[]";
                const clean = rawContent.replace(/```json|```/g, "").trim();
                const match = clean.match(/\[[\s\S]*\]/);
                const parsedAI: string[] = match ? JSON.parse(match[0]) : [];

                parsedAI
                    .filter(d => typeof d === "string" && d.includes("."))
                    .map(d => d.toLowerCase().trim().replace(/[^a-z0-9.-]/g, ""))
                    .filter(Boolean)
                    .forEach(d => allSuggestions.add(d));

            } catch (e: any) {
                // Silently fallback to classic generated list if AI rate-limits or fails
                console.log("[Notice] Simple search AI fallback used:", e?.message ?? e);
            }
        }

        // 2. Alternate TLDs Backup
        for (const fTld of fallbackTlds) {
            if (fTld !== tld) {
                allSuggestions.add(baseName + fTld);
            }
        }

        // 3. Prefixes Backup
        for (const pref of prefixes) {
            allSuggestions.add(`${pref}${baseName}${tld}`);
            allSuggestions.add(`${pref}${baseName}.net`);
        }

        // 4. Suffixes Backup
        for (const suff of suffixes) {
            allSuggestions.add(`${baseName}${suff}${tld}`);
            allSuggestions.add(`${baseName}${suff}.net`);
        }

        const suggestionsArr = Array.from(allSuggestions);
        const startIndex = (page - 1) * pageSize;
        const pagedSuggestions = suggestionsArr.slice(startIndex, startIndex + pageSize);

        const domainsToCheck = new Set<string>();
        // Only check the primary domain on the first page
        if (page === 1) {
            domainsToCheck.add(pDomain);
        }
        
        pagedSuggestions.forEach(d => domainsToCheck.add(d));

        const checkPromises = Array.from(domainsToCheck).map(async (domain) => {
            try {
                // Return result or catch error gently
                let res;
                try {
                     res = await checkDomainAvailability(domain);
                } catch(e) {
                     // If it completely fails, assume unavailable right now
                     res = { result: "error" as const, status: "unavailable" as const };
                }
                return { ...res, domain };
            } catch (err: any) {
                console.error(`[DomainCheck API] failed for ${domain}:`, err.message);
                return {
                    result: "error" as const,
                    status: "error" as const,
                    domain,
                    message: err.message
                };
            }
        });

        const results = await Promise.all(checkPromises);
        
        let targetResult: DomainWhoisResponse | undefined = undefined;
        let suggestions: DomainWhoisResponse[] = [];

        results.forEach((res) => {
            if (page === 1 && res.domain === pDomain) {
                 targetResult = res;
            } else if (res.status === 'available') {
                 // Only return available ones as suggestions to avoid clutter
                 suggestions.push(res as DomainWhoisResponse);
            }
        });

        // Ensure target is populated even if it failed weirdly, but only on page 1
        if (page === 1 && !targetResult) {
             targetResult = {
                  result: "error",
                  status: "error",
                  domain: pDomain,
                  message: "Could not retrieve status"
             };
        }

        const hasMore = startIndex + pageSize < suggestionsArr.length;

        return NextResponse.json(
            { success: true, target: targetResult, suggestions, hasMore, page },
            {
                status: 200,
                headers: {
                    "Cache-Control": "public, s-maxage=0, no-cache",
                },
            }
        );

    } catch (error) {
        console.error("[DomainCheck API Error]:", error);
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json(
            { success: false, error: message },
            { status: 500 }
        );
    }
}
