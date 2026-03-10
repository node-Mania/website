"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ChevronDown, Globe, Server, Cpu, Shield, Menu, X, Cloud, Lock, Mail, Activity, Signal, Search, ArrowRight, Database, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { public_routes } from "@/lib/constants/routes";
import { useCurrency } from '@/context/CurrencyContext';
import { CurrencySelector } from "./CurrencySelector";

interface NavItemLink {
    label: string;
    href: string;
    icon?: React.ReactNode;
    desc?: string;
    badge?: string;
}

interface NavColumn {
    title: string;
    href?: string;
    items: NavItemLink[];
}

interface NavItem {
    label: string;
    href: string;
    mega: boolean;
    columns?: NavColumn[];
    promo?: {
        title: string;
        desc: string;
        color: string;
    };
}

const STATIC_NAV_ITEMS: NavItem[] = [

    {
        label: "Domains",
        href: public_routes.DOMAINS,
        mega: true,
        columns: [
            {
                title: "Domain Services",
                items: [
                    { label: "Domain Registration", href: public_routes.DOMAINS, icon: <Search className="w-4 h-4 text-blue-500" />, desc: "Find your perfect name" },
                    { label: "Domain Transfer", href: "https://my.nodemania.com/cart.php?a=add&domain=transfer", icon: <ArrowRight className="w-4 h-4 text-green-500" />, desc: "Move your domain to us" },
                    // { label: "Bulk Search", href: "#", icon: <Database className="w-4 h-4 text-purple-500" />, desc: "Register multiple domains" },
                ]
            },
            {
                title: "Extensions",
                items: [
                    { label: ".com", href: "https://my.nodemania.com/cart.php?a=add&domain=register", desc: "$9.99/yr", badge: "Popular" },
                    { label: ".net", href: "https://my.nodemania.com/cart.php?a=add&domain=register", desc: "$12.99/yr" },
                    { label: ".io", href: "https://my.nodemania.com/cart.php?a=add&domain=register", desc: "$39.99/yr", badge: "Tech" },
                    { label: ".ai", href: "https://my.nodemania.com/cart.php?a=add&domain=register", desc: "$69.99/yr", badge: "Hot" },
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
                    { label: "Basic Hosting", href: public_routes.WebHosting, icon: <Globe className="w-4 h-4 text-blue-600" />, desc: "Perfect for startups & blogs" },
                    { label: "Business Hosting", href: public_routes.BusinessHosting, icon: <Server className="w-4 h-4 text-indigo-600" />, desc: "More power & resources" },

                ]
            },
            {
                title: "Specialty Hosting",
                items: [
                    { label: "WordPress Hosting", href: public_routes.WordPressHosting, icon: <Cpu className="w-4 h-4 text-emerald-600" />, desc: "Optimized for WP speed" },
                ]
            }
        ],
        promo: {
            title: "Free Migration",
            desc: "Expert team will move your site to us for free with zero downtime.",
            color: "bg-emerald-50"
        }
    },

    {
        label: "Security",
        href: "#",
        mega: true,
        columns: [
            {
                title: "Security",
                items: [
                    { label: "SSL Certificates", href: public_routes.SSLCertificate, icon: <Lock className="w-4 h-4 text-emerald-500" />, desc: "Encryption for users" },
                    { label: "360 Monitoring", href: public_routes.SiteMonitoring, icon: <Activity className="w-4 h-4 text-blue-500" />, desc: "Real-time site health" },


                ]
            },
            {
                title: "Productivity",
                items: [
                    // { label: "Pro Email", href: "#", icon: <Mail className="w-4 h-4 text-indigo-500" />, desc: "Brandname email" },
                    { label: "NordVPN", href: public_routes.NordVPN, icon: <Shield className="w-4 h-4 text-blue-500" />, desc: "Private browsing" },
                    { label: "CodeGuard", href: public_routes.Codeguard, icon: <Cloud className="w-4 h-4 text-sky-500" />, desc: "Daily backups" },
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
        label: "Email Solution",
        href: public_routes.BusinessEmail,
        mega: true,
        columns: [
            {
                title: "Business Email",
                href: public_routes.BusinessEmail,
                items: [
                    { label: "OX App Suite", href: public_routes.OXAppSuite, icon: <Mail className="w-4 h-4 text-blue-600" />, desc: "Premium business email & calendar" },
                    { label: "OX App Suite + Productivity", href: public_routes.OXAppSuitePlusProductivity, icon: <Zap className="w-4 h-4 text-indigo-600" />, desc: "Unified workspace with office apps" },
                ]
            },
            {
                title: "Email Services",
                items: [
                    { label: "Email Security", href: public_routes.EmailServices, icon: <Shield className="w-4 h-4 text-emerald-600" />, desc: "Advanced spam & threat filtering" },
                ]
            }
        ],
        promo: {
            title: "Professional Image",
            desc: "First impressions matter. Boost your brand authority with business email that works as hard as you do.",
            color: "bg-indigo-50"
        }
    },
    {
        href: public_routes.SocialBee,
        label: "SocialBee",
        mega: false,
    },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
    const [dynamicTlds, setDynamicTlds] = useState<any[]>([]);
    const [currency, setCurrency] = useState({ prefix: "$", suffix: "USD" });

    const { currencies, selectedCurrency } = useCurrency();
    const activeCurrency = currencies.find(c => c.code === selectedCurrency);

    useEffect(() => {
        const currencyId = activeCurrency?.id;
        const url = `/api/domains/tlds${currencyId ? `?currencyId=${currencyId}` : ""}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const targetExtensions = ['com', 'net', 'io'];
                    const filtered = data.tlds.filter((tld: any) =>
                        targetExtensions.includes(tld.extension)
                    );
                    setDynamicTlds(filtered);
                    setCurrency(data.currency);
                }
            })
            .catch(err => console.error("Error fetching TLDs:", err));
    }, [activeCurrency?.id]);

    const navItems = useMemo(() => {
        return STATIC_NAV_ITEMS.map(item => {
            if (item.label === "Domains") {
                const newColumns = item.columns?.map(col => {
                    if (col.title === "Extensions") {
                        const newItems = dynamicTlds.length > 0 ? dynamicTlds.map(tld => ({
                            label: `.${tld.extension}`,
                            href: "https://my.nodemania.com/cart.php?a=add&domain=register",
                            desc: `${currency.prefix}${Object.values(tld.register)[0]}/yr`,
                            badge: tld.extension === 'com' ? 'Popular' : tld.extension === 'ai' ? 'Hot' : tld.extension === 'io' ? 'Tech' : undefined
                        })) : col.items;
                        return { ...col, items: newItems };
                    }
                    return col;
                });
                return { ...item, columns: newColumns };
            }
            return item;
        });
    }, [dynamicTlds, currency]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

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
                (isScrolled || mobileMenuOpen)
                    ? "bg-white/95 backdrop-blur-md border-slate-200 py-3 shadow-sm"
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
                    {navItems.map((item) => (
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
                    {/* <Button
                        variant="ghost"
                        size="sm"
                        className="font-bold text-slate-600 hover:text-primary transition-colors"
                    >
                        Login
                    </Button> */}
                    <CurrencySelector variant="nav" />
                    <Button variant="primary" size="sm" className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-bold px-6" onClick={() => window.location.href = "https://my.nodemania.com/clientarea.php"}>Client Area</Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={cn(
                        "lg:hidden p-2 rounded-lg transition-colors z-50",
                        (isScrolled || mobileMenuOpen) ? "text-slate-800 hover:bg-slate-100" : "text-slate-800 hover:bg-white/10"
                    )}
                    onClick={() => {
                        setMobileMenuOpen(!mobileMenuOpen);
                        if (activeDropdown) setActiveDropdown(null);
                    }}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden absolute top-full left-0 w-full bg-white z-40 overflow-y-auto border-t border-slate-100"
                    >
                        <div className="container mx-auto px-4 py-8 flex flex-col gap-6 pb-32">
                            {navItems.map((item) => (
                                <div key={item.label} className="flex flex-col gap-4">
                                    {item.mega ? (
                                        <div className="space-y-4">
                                            <button
                                                onClick={() => setMobileSubmenu(mobileSubmenu === item.label ? null : item.label)}
                                                className="flex items-center justify-between w-full text-left"
                                            >
                                                <span className="text-xl font-bold text-slate-900">{item.label}</span>
                                                <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", mobileSubmenu === item.label ? "rotate-180" : "")} />
                                            </button>

                                            <AnimatePresence>
                                                {mobileSubmenu === item.label && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="overflow-hidden pl-4 border-l-2 border-slate-100 space-y-6"
                                                    >
                                                        {item.columns?.map((col, idx) => (
                                                            <div key={idx} className="space-y-3">
                                                                {col.href ? (
                                                                    <Link href={col.href} className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mt-4 hover:text-primary transition-colors">
                                                                        {col.title}
                                                                    </Link>
                                                                ) : (
                                                                    <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mt-4">{col.title}</h4>
                                                                )}
                                                                <div className="grid gap-4">
                                                                    {col.items.map((link: any, i: number) => (
                                                                        <Link
                                                                            key={i}
                                                                            href={link.href}
                                                                            className="flex items-start gap-4"
                                                                            onClick={() => setMobileMenuOpen(false)}
                                                                        >
                                                                            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                                                                {link.icon || <Globe className="w-4 h-4" />}
                                                                            </div>
                                                                            <div>
                                                                                <div className="text-sm font-bold text-slate-800">{link.label}</div>
                                                                                {link.desc && <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{link.desc}</p>}
                                                                            </div>
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-xl font-bold text-slate-900"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}

                            <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                                {/* <Button variant="ghost" className="w-full font-bold text-slate-600 h-12 text-lg">Login</Button> */}
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm font-bold text-slate-500">Currency</span>
                                    <CurrencySelector variant="nav" />
                                </div>
                                <Button variant="primary" className="w-full font-bold shadow-lg shadow-primary/20 h-12 text-lg" onClick={() => window.location.href = "https://my.nodemania.com/clientarea.php"}>Client Area</Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Full Width Mega Menu Overlay */}
            <div className={cn(
                "absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl overflow-hidden transition-all duration-300 origin-top text-slate-800",
                activeDropdown ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
            )}>
                <div className="container mx-auto px-4 md:px-6 py-8">
                    {navItems.map((item) => (
                        <div
                            key={item.label}
                            className={cn("grid grid-cols-12 gap-8", activeDropdown === item.label ? "block" : "hidden")}
                        >
                            {/* Columns */}
                            <div className="col-span-8 grid grid-cols-2 gap-12 border-r border-slate-100 pr-8">
                                {item.columns?.map((col, idx) => (
                                    <div key={idx} className="space-y-6">
                                        {col.href ? (
                                            <Link href={col.href} className="text-xs font-bold text-slate-900 uppercase tracking-widest hover:text-primary transition-colors">
                                                {col.title}
                                            </Link>
                                        ) : (
                                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">{col.title}</h4>
                                        )}
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
                            <div className="col-span-4 pl-4 mt-5">
                                {item.promo && (
                                    <div className={cn("h-full rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden group hover:shadow-lg transition-all", item.promo.color)}>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                                        <div className="relative z-10">
                                            <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-bold shadow-sm mb-4">Featured</span>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.promo.title}</h3>
                                            <p className="text-slate-600 mb-6 font-medium leading-relaxed">{item.promo.desc}</p>
                                            <Button size="sm" className="w-fit font-bold" onClick={() => window.Tawk_API?.maximize()}>Learn More</Button>
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
