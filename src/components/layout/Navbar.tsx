"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ChevronDown, Globe, Server, Cpu, Shield, Menu, X, Cloud, Lock, Mail, Activity, Signal, Search, ArrowRight, Database, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    {
        label: "Domains",
        href: "/domains",
        mega: true,
        columns: [
            {
                title: "Domain Services",
                items: [
                    { label: "Domain Registration", href: "/domains", icon: <Search className="w-4 h-4 text-blue-500" />, desc: "Find your perfect name" },
                    { label: "Domain Transfer", href: "#", icon: <ArrowRight className="w-4 h-4 text-green-500" />, desc: "Move your domain to us" },
                    // { label: "Bulk Search", href: "#", icon: <Database className="w-4 h-4 text-purple-500" />, desc: "Register multiple domains" },
                ]
            },
            {
                title: "Extensions",
                items: [
                    { label: ".com", href: "#", desc: "$9.99/yr", badge: "Popular" },
                    { label: ".net", href: "#", desc: "$12.99/yr" },
                    { label: ".io", href: "#", desc: "$39.99/yr", badge: "Tech" },
                    { label: ".ai", href: "#", desc: "$69.99/yr", badge: "Hot" },
                ]
            }
        ],
        promo: {
            title: "Free Domain Privacy",
            desc: "Protect your personal info with every registration forever.",
            color: "bg-blue-50"
        }
    },
    {
        label: "Web Hosting",
        href: "#",
        mega: true,
        columns: [
            {
                title: "Hosting Solutions",
                items: [
                    { label: "Basic Hosting", href: "/web-hosting", icon: <Globe className="w-4 h-4 text-blue-600" />, desc: "Perfect for startups & blogs" },
                    { label: "Business Hosting", href: "/business-hosting", icon: <Server className="w-4 h-4 text-indigo-600" />, desc: "More power & resources" },

                ]
            },
            {
                title: "Specialty Hosting",
                items: [
                    { label: "WordPress Hosting", href: "/wordpress-hosting", icon: <Cpu className="w-4 h-4 text-emerald-600" />, desc: "Optimized for WP speed" },
                ]
            }
        ],
        promo: {
            title: "Free Migration",
            desc: "Expert team will move your site to us for free with zero downtime.",
            color: "bg-emerald-50"
        }
    },
    // {
    //     label: "Servers",
    //     href: "#",
    //     mega: true,
    //     columns: [
    //         {
    //             title: "Virtual Servers",
    //             items: [
    //                 { label: "Cloud VPS", href: "#", icon: <Cloud className="w-4 h-4 text-cyan-500" />, desc: "Scalable compute power" },
    //                 { label: "Storage VPS", href: "#", icon: <Database className="w-4 h-4 text-orange-500" />, desc: "Massive storage instances" },
    //             ]
    //         },
    //         {
    //             title: "Dedicated Power",
    //             items: [
    //                 { label: "Dedicated Servers", href: "#", icon: <Server className="w-4 h-4 text-slate-800" />, desc: "Single-tenant metal" },
    //                 { label: "Bare Metal", href: "#", icon: <Cpu className="w-4 h-4 text-red-600" />, desc: "Raw performance access" },
    //             ]
    //         }
    //     ],
    //     promo: {
    //         title: "NVMe Gen5 Speed",
    //         desc: "All servers powered by the latest enterprise Gen5 storage.",
    //         color: "bg-orange-50"
    //     }
    // },
    {
        label: "Security & Tools",
        href: "#",
        mega: true,
        columns: [
            {
                title: "Security",
                items: [
                    { label: "SSL Certificates", href: "/web-security/ssl-certificate", icon: <Lock className="w-4 h-4 text-emerald-500" />, desc: "Encryption for users" },
                    { label: "360 Monitoring", href: "/web-security/360-Monitoring", icon: <Activity className="w-4 h-4 text-blue-500" />, desc: "Real-time site health" },
                    { label: "NordVPN", href: "#", icon: <Shield className="w-4 h-4 text-blue-500" />, desc: "Private browsing" },
                    { label: "SiteLock", href: "#", icon: <Lock className="w-4 h-4 text-red-500" />, desc: "Malware scanning" },
                ]
            },
            {
                title: "Productivity",
                items: [
                    { label: "Pro Email", href: "#", icon: <Mail className="w-4 h-4 text-indigo-500" />, desc: "Brandname email" },
                    { label: "SocialBee", href: "#", icon: <Signal className="w-4 h-4 text-amber-500" />, desc: "Social automation" },
                    { label: "CodeGuard", href: "#", icon: <Cloud className="w-4 h-4 text-sky-500" />, desc: "Daily backups" },
                ]
            }
        ],
        promo: {
            title: "24/7 Monitoring",
            desc: "Keep your business online with proactive infrastructure monitoring.",
            color: "bg-purple-50"
        }
    },
    {
        label: "Blogs",
        href: "/blog",
        mega: false,

    },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        // Check initial scroll
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md border-slate-200 py-3 shadow-sm"
                    : "bg-transparent border-transparent py-5"
            )}
            onMouseLeave={() => setActiveDropdown(null)}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between relative">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group z-50 relative">
                    <div className="relative w-[180px] h-[45px]">
                        <Image src="/logo/dark-logo.png" alt="nodeMania" fill className="object-contain" />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {NAV_ITEMS.map((item) => (
                        <div
                            key={item.label}
                            className="px-4 py-2"
                            onMouseEnter={() => item.mega ? setActiveDropdown(item.label) : null}
                        >
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-1.5 text-sm font-medium transition-all duration-200",
                                    (activeDropdown === item.label ? "text-primary" : "text-slate-800 hover:text-primary")
                                )}
                            >
                                {item.label}
                                {item.mega && <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", activeDropdown === item.label ? "rotate-180" : "")} />}
                            </Link>
                        </div>
                    ))}

                </div>

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-4 z-50">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="font-bold text-slate-600 hover:text-primary transition-colors"
                    >
                        Login
                    </Button>
                    <Button variant="primary" size="sm" className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-bold px-6">Get Started</Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={cn(
                        "lg:hidden p-2 rounded-lg transition-colors z-50",
                        isScrolled ? "text-slate-800 hover:bg-slate-100" : "text-slate-800 hover:bg-white/10"
                    )}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Full Width Mega Menu Overlay */}
            <div className={cn(
                "absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl overflow-hidden transition-all duration-300 origin-top text-slate-800",
                activeDropdown ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
            )}>
                <div className="container mx-auto px-4 md:px-6 py-8">
                    {NAV_ITEMS.map((item) => (
                        <div
                            key={item.label}
                            className={cn("grid grid-cols-12 gap-8", activeDropdown === item.label ? "block" : "hidden")}
                        >
                            {/* Columns */}
                            <div className="col-span-8 grid grid-cols-2 gap-12 border-r border-slate-100 pr-8">
                                {item.columns?.map((col, idx) => (
                                    <div key={idx} className="space-y-6">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{col.title}</h4>
                                        <ul className="space-y-4">
                                            {col.items.map((link: any, i: number) => (
                                                <li key={i}>
                                                    <Link href={link.href} className="group flex items-start gap-4 p-2 -ml-2 rounded-xl hover:bg-slate-50 transition-colors">
                                                        {link.icon && (
                                                            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 group-hover:text-primary group-hover:border-primary/20 group-hover:scale-110 transition-all">
                                                                {link.icon}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-slate-800 group-hover:text-primary transition-colors">{link.label}</span>
                                                                {link.badge && <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase">{link.badge}</span>}
                                                            </div>
                                                            {link.desc && <p className="text-xs text-slate-500 mt-0.5">{link.desc}</p>}
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Promo Section */}
                            <div className="col-span-4 pl-4">
                                {item.promo && (
                                    <div className={cn("h-full rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden group hover:shadow-lg transition-all", item.promo.color)}>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                                        <div className="relative z-10">
                                            <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-bold shadow-sm mb-4">Featured</span>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.promo.title}</h3>
                                            <p className="text-slate-600 mb-6 font-medium leading-relaxed">{item.promo.desc}</p>
                                            <Button size="sm" className="w-fit font-bold">Learn More</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </nav >
    );
}
