"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Headphones, Gift, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

declare global {
    interface Window {
        Tawk_API?: {
            maximize: () => void;
            hideWidget: () => void;
            showWidget: () => void;
        };
    }
}

const PromoPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if popup has been shown in this session
        const hasBeenShown = sessionStorage.getItem("nodeMania_promo_shown");

        if (!hasBeenShown) {
            // Show popup after a delay to improve engagement
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleGetOffer = () => {
        // Close the popup
        handleClose();

        sessionStorage.setItem("nodeMania_promo_shown", "true");

        // Maximize Tawk.to chat
        if (window.Tawk_API && typeof window.Tawk_API.maximize === "function") {
            window.Tawk_API.maximize();
        } else {
            console.warn("Tawk_API not found or maximize function not available");
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 pointer-events-none">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md pointer-events-auto"
                        onClick={handleClose}
                    />

                    {/* Popup Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden pointer-events-auto border border-slate-100"
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-[60px] rounded-full" />
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/5 blur-[60px] rounded-full" />

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all z-10"
                        >
                            <X size={22} />
                        </button>

                        <div className="relative p-8 md:p-12 flex flex-col items-center text-center">
                            {/* Icon/Badge */}
                            <motion.div
                                initial={{ rotate: -10, scale: 0.8 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center mb-6 shadow-xl shadow-primary/20"
                            >
                                <Gift className="text-white w-8 h-8" />
                            </motion.div>

                            {/* Content */}
                            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                                Special Welcome <span className="text-gradient">Offer!</span>
                            </h3>

                            <p className="text-slate-600 text-lg mb-8 max-w-sm">
                                Get <span className="text-primary font-bold">20% OFF</span> your first month and experience our
                                <span className="tex-dark font-bold"> 24/7 Expert Support</span>.
                            </p>

                            {/* Support Message Box */}
                            <div className="bg-blue-50/50 rounded-2xl p-5 mb-8 border border-blue-100/50 w-full">
                                <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                                    <span className="block font-semibold text-primary mb-1">Need help getting started?</span>
                                    Talk with our support agent to get a <span className="text-primary font-bold">special offer</span> just for you.
                                    We help you to order your <span className="text-slate-900 font-semibold">domain and hosting</span> in minutes!
                                </p>
                            </div>

                            {/* Feature Grid */}
                            <div className="grid grid-cols-2 gap-4 w-full mb-8">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Headphones size={18} className="text-primary" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700">24/7 Support</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Sparkles size={18} className="text-primary" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700">Instant Setup</span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <Button
                                onClick={handleGetOffer}
                                variant="primary"
                                size="lg"
                                className="w-full group py-6 text-lg rounded-xl"
                            >
                                <MessageCircle className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
                                Get Your Offer Now
                            </Button>

                            <p className="mt-5 text-xs font-medium text-slate-400 uppercase tracking-widest">
                                Limited time offer • Chat with us to claim
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PromoPopup;
