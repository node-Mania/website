export interface LegalDocument {
    title: string;
    slug: string;
    filename: string;
    description: string;
    category: "Legal" | "Policy" | "Agreement";
}

export const LEGAL_DOCS: LegalDocument[] = [
    {
        title: "Terms and Conditions",
        slug: "terms-and-conditions",
        filename: "TERM_AND_CONDITIONS.md",
        description: "The general terms and conditions for using NodeMania services.",
        category: "Legal",
    },
    {
        title: "Privacy Policy",
        slug: "privacy-policy",
        filename: "PRIVACY_POLICY.md",
        description: "How we collect, use, and protect your personal information.",
        category: "Policy",
    },
    {
        title: "Acceptable Use Policy",
        slug: "acceptable-use-policy",
        filename: "ACCEPTABLE_USE_POLICY.md",
        description: "The rules and guidelines for using our hosting environment.",
        category: "Policy",
    },
    {
        title: "Cookie Policy",
        slug: "cookie-policy",
        filename: "COOKIE_POLICY.md",
        description: "Details about the cookies we use to improve your experience.",
        category: "Policy",
    },
    {
        title: "Service Level Agreement",
        slug: "service-level-agreement",
        filename: "SERVICE_LEVEL_AGREEMENT.md",
        description: "Our commitment to uptime and service quality (SLA).",
        category: "Agreement",
    },
    {
        title: "Cancellation & Refund Policy",
        slug: "cancellation-refund-policy",
        filename: "CANCELLATION_RETURN_REFUND_POLICY.md",
        description: "Information about canceling services and requesting refunds.",
        category: "Policy",
    },
    {
        title: "Data Processing Agreement",
        slug: "data-processing-agreement",
        filename: "DATA_PROCESSING_AGREEMENT.md",
        description: "How we handle data processing in compliance with regulations.",
        category: "Agreement",
    },
    {
        title: "DMCA & Copyright Policy",
        slug: "dmca-copyright-policy",
        filename: "DMCA_COPYRIGHT POLICY.md",
        description: "Our policy regarding copyright infringement claims.",
        category: "Policy",
    },
    {
        title: "Ownership Disclosure",
        slug: "ownership",
        filename: "OWERSHIP.md",
        description: "Information about NodeMania ownership and legal entities.",
        category: "Legal",
    },
];
