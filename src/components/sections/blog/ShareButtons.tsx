"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Link2, Check, MessageCircle } from "lucide-react";

interface ShareButtonsProps {
    url: string;
    title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: "Facebook",
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: "hover:bg-blue-600 hover:text-white hover:border-blue-600",
        },
        {
            name: "Twitter",
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            color: "hover:bg-sky-500 hover:text-white hover:border-sky-500",
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
            color: "hover:bg-blue-700 hover:text-white hover:border-blue-700",
        },
        {
            name: "WhatsApp",
            icon: MessageCircle,
            href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            color: "hover:bg-green-500 hover:text-white hover:border-green-500",
        },
    ];

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-500 mr-1">Share:</span>
            {shareLinks.map((link) => (
                <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 text-slate-500 transition-all duration-200 ${link.color}`}
                    title={`Share on ${link.name}`}
                >
                    <link.icon className="w-4 h-4" />
                </motion.a>
            ))}

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCopyLink}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer ${copied
                        ? "bg-green-500 text-white border-green-500"
                        : "border-slate-200 text-slate-500 hover:bg-slate-700 hover:text-white hover:border-slate-700"
                    }`}
                title="Copy link"
            >
                {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            </motion.button>
        </div>
    );
}
