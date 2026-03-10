import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LEGAL_DOCS } from "@/lib/legal-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ScrollText, ShieldCheck, Scale } from "lucide-react";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import { marked } from "marked";


interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return LEGAL_DOCS.map((doc) => ({
        slug: doc.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const doc = LEGAL_DOCS.find((d) => d.slug === slug);
    if (!doc) return {};

    return {
        title: `${doc.title} | nodeMania`,
        description: doc.description,
    };
}

const CategoryIcon = ({ category }: { category: string }) => {
    switch (category) {
        case "Legal":
            return <Scale className="w-5 h-5" />;
        case "Agreement":
            return <ShieldCheck className="w-5 h-5" />;
        case "Policy":
        default:
            return <ScrollText className="w-5 h-5" />;
    }
};

export default async function LegalDocumentPage({ params }: Props) {
    const { slug } = await params;
    const doc = LEGAL_DOCS.find((d) => d.slug === slug);

    if (!doc) {
        notFound();
    }

    // Define the path to the legal documents folder
    const docsPath = path.join(process.cwd(), "design_file_temp", "legal_page_content");
    let content = "";

    try {
        const filePath = path.join(docsPath, doc.filename);
        content = await fs.readFile(filePath, "utf-8");
    } catch (error) {
        console.error(`Failed to read legal document: ${doc.filename}`, error);
        content = "# Document Not Found\n\nSorry, the document content could not be loaded.";
    }

    // Enhanced parser for plaintext-style legal docs
    // const formattedContent = content
    //     .split("\n\n")
    //     .map(block => {
    //         block = block.trim();
    //         if (!block) return "";

    //         // Detected Header pattern: Single line, no trailing punctuation, short-ish OR starts with number
    //         const lines = block.split('\n');
    //         const isHeading = lines.length === 1 && (
    //             block.startsWith("#") ||
    //             /^\d+\./.test(block) ||
    //             (block.length < 100 && !block.endsWith(".") && !block.endsWith(",") && !block.includes(":"))
    //         );

    //         if (isHeading) {
    //             if (block.startsWith("# ")) return `<h1 class="text-3xl font-bold mb-6">${block.replace("# ", "")}</h1>`;
    //             if (block.startsWith("## ")) return `<h2 class="text-2xl font-bold mt-10 mb-4">${block.replace("## ", "")}</h2>`;
    //             // Handle "1. Header" or "CANCELLATION..."
    //             return `<h2 class="text-2xl font-bold mt-10 mb-4">${block}</h2>`;
    //         }

    //         // List items check (detecting single lines that look like list items)
    //         if (lines.length > 1 && lines.every(l => l.trim().startsWith("-") || l.trim().startsWith("*") || l.trim().length === 0)) {
    //             const items = lines
    //                 .filter(l => l.trim().length > 0)
    //                 .map(li => `<li>${li.trim().substring(2)}</li>`)
    //                 .join("");
    //             return `<ul class="list-disc pl-6 space-y-2 my-4">${items}</ul>`;
    //         }

    //         // Detect "Paragraph with sub-items" (list items not sepa
    //         // rated by double newline)
    //         if (lines.length > 1) {
    //             const processedLines = lines.map(line => {
    //                 if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
    //                     return `<li class="ml-6 list-disc">${line.trim().substring(2)}</li>`;
    //                 }
    //                 return line + '<br/>';
    //             }).join("");
    //             return `<p class="leading-relaxed mb-4">${processedLines}</p>`;
    //         }

    //         // Default paragraph
    //         return `<p class="leading-relaxed mb-4">${block.replace(/\n/g, "<br/>")}</p>`;
    //     })
    //     .join("");


    const formattedContent = marked(content);

    return (
        <main className="min-h-screen bg-background font-sans overflow-x-hidden pt-24">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="max-w-4xl mx-auto mb-8">
                    <Link
                        href="/legal"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm mb-12"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Legal Center
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-100 pb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                                    <CategoryIcon category={doc.category} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    {doc.category} Document
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                                {doc.title}
                            </h1>
                        </div>
                        <div className="flex items-center gap-6 text-slate-400 text-sm italic">
                            <div className="flex items-center gap-2 font-medium">
                                <Clock className="w-4 h-4" />
                                Updated: Mar 2026
                            </div>
                        </div>
                    </div>

                    <article
                        className="prose prose-slate prose-lg max-w-none text-slate-600 prose-headings:text-slate-900 prose-strong:text-slate-900 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:marker:text-primary"
                        dangerouslySetInnerHTML={{ __html: formattedContent }}
                    />

                    <div className="mt-20 p-8 md:p-12 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Have questions about our legal policies?</h3>
                            <p className="text-slate-500">Our support team is available 24/7 to clarify any of our legal terms.</p>
                        </div>
                        <Link
                            href="https://my.nodemania.com/contact.php"
                            className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-primary/20 transition-all whitespace-nowrap"
                        >
                            Contact Legal Support
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
