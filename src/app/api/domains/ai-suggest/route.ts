import { NextRequest, NextResponse } from "next/server";
import { OpenRouter } from "@openrouter/sdk";
import { checkDomainAvailability } from "@/lib/services/whmcs.service";
import { DomainWhoisResponse } from "@/lib/types/whmcs.types";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const prompt = searchParams.get("prompt");

        if (!prompt) {
            return NextResponse.json(
                { success: false, error: "Prompt parameter is required" },
                { status: 400 }
            );
        }

        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { success: false, error: "AI suggestions are not configured on this server. Please add OPENROUTER_API_KEY to .env.local" },
                { status: 500 }
            );
        }

        // Read model from env, fallback to a reliable free model
        const model = process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.3-70b-instruct:free";

        // Initialize the official OpenRouter SDK client
        const client = new OpenRouter({ apiKey });

        let rawContent = "[]";
        try {
            const response = await client.chat.send({
                chatRequest: {
                    model,
                    messages: [
                        {
                            role: "system",
                            content: `You are a creative domain name generator API. Output ONLY a valid JSON array of 12 creative domain names based on the user's concept. No markdown, no explanation, no extra text.
Rules:
1. Output ONLY a raw JSON array. Example: ["mybrand.com", "youridea.io"]
2. Mix TLDs: .com, .net, .org, .co, .io, .ai, .app, .dev
3. Names should be catchy, short (under 15 chars without TLD), and brandable.`
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ]
                }
            });

            rawContent = response.choices[0]?.message?.content ?? "[]";
        } catch (aiErr: any) {
            // Handle 429 rate limiting gracefully
            if (aiErr?.status === 429 || aiErr?.message?.includes("429") || String(aiErr).includes("429")) {
                return NextResponse.json(
                    { success: false, error: "The free AI matchmaker is rate-limited right now. Please try again in a moment, or use exact domain search instead!" },
                    { status: 429 }
                );
            }
            throw aiErr;
        }

        // Parse response — handle stray markdown fences some models output
        let domainsToTest: string[] = [];
        try {
            const clean = rawContent.replace(/```json|```/g, "").trim();
            const match = clean.match(/\[[\s\S]*\]/);
            domainsToTest = match ? JSON.parse(match[0]) : [];
        } catch (e) {
            console.error("[AI Parse Error] Raw content was:", rawContent);
            return NextResponse.json(
                { success: false, error: "Failed to parse AI output into domain names." },
                { status: 500 }
            );
        }

        // Sanitize
        domainsToTest = domainsToTest
            .filter((d): d is string => typeof d === "string" && d.includes("."))
            .map(d => d.toLowerCase().trim().replace(/[^a-z0-9.-]/g, ""))
            .filter(Boolean)
            .slice(0, 12);

        if (domainsToTest.length === 0) {
            return NextResponse.json(
                { success: false, error: "AI did not generate any valid domain names. Please rephrase your idea!" },
                { status: 500 }
            );
        }

        // Parallel WHMCS availability checks
        const checkPromises = domainsToTest.map(async (domain) => {
            try {
                const res = await checkDomainAvailability(domain);
                return { ...res, domain };
            } catch (err: any) {
                return {
                    result: "error" as const,
                    status: "error" as const,
                    domain,
                    message: err.message,
                };
            }
        });

        const results = await Promise.all(checkPromises);

        let targetResult: DomainWhoisResponse | undefined;
        const suggestions: DomainWhoisResponse[] = [];

        for (const res of results) {
            if (res.status === "available") {
                if (!targetResult) {
                    targetResult = res as DomainWhoisResponse;
                } else {
                    suggestions.push(res as DomainWhoisResponse);
                }
            }
        }

        if (!targetResult) {
            return NextResponse.json(
                { success: false, error: "All AI-suggested domains appear to be taken. Try rephrasing your idea for fresh results!" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, target: targetResult, suggestions, hasMore: false },
            {
                status: 200,
                headers: { "Cache-Control": "no-store" },
            }
        );

    } catch (error) {
        console.error("[AI DomainCheck API Error]:", error);
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json(
            { success: false, error: message },
            { status: 500 }
        );
    }
}
