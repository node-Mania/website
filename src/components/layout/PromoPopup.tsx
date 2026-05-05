"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Headphones, Gift, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";


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

    // Prevent body scroll when popup is visible
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isVisible]);

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
                <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 py-8 md:p-6 pointer-events-none">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md pointer-events-auto"
                        onClick={handleClose}
                    />

                    {/* Popup Card Wrapper (to allow scrolling on mobile) */}
                    <div className="relative w-full max-w-lg min-h-full flex items-center justify-center pointer-events-none py-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden pointer-events-auto border border-slate-100 mx-auto"
                        >
                            {/* Decorative Background Elements */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-[60px] rounded-full" />
                            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/5 blur-[60px] rounded-full" />

                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all z-10"
                            >
                                <X size={22} />
                            </button>

                            <div className="relative p-6 md:p-12 flex flex-col items-center text-center">
                                {/* Icon/Badge */}
                                <motion.div
                                    initial={{ rotate: -10, scale: 0.8 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-brand flex items-center justify-center mb-4 md:mb-6 shadow-xl shadow-primary/20"
                                >
                                    <Gift className="text-white w-7 h-7 md:w-8 md:h-8" />
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight">
                                    Special Welcome <span className="text-gradient">Offer!</span>
                                </h3>

                                <p className="text-slate-600 text-base md:text-lg mb-6 md:mb-8 max-w-sm leading-relaxed">
                                    Get <span className="text-primary font-bold">20% OFF</span> your first month and experience our
                                    <span className="text-slate-900 font-bold"> 24/7 Expert Support</span>.
                                </p>

                                {/* Support Message Box */}
                                <div className="bg-blue-50/50 rounded-2xl p-4 md:p-5 mb-6 md:mb-8 border border-blue-100/50 w-full">
                                    <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                                        <span className="block font-semibold text-primary mb-1">Need help getting started?</span>
                                        Talk with our support agent to get a <span className="text-primary font-bold">special offer</span> just for you.
                                        We help you to order your <span className="text-slate-900 font-semibold">domain and hosting</span> in minutes!
                                    </p>
                                </div>

                                {/* Feature Grid */}
                                <div className="grid grid-cols-2 gap-3 md:gap-4 w-full mb-6 md:mb-8">
                                    <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-xl bg-slate-50 border border-slate-100 text-left">
                                        <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 flex-shrink-0">
                                            <Headphones size={16} className="text-primary md:w-[18px] md:h-[18px]" />
                                        </div>
                                        <span className="text-[12px] md:text-sm font-semibold text-slate-700 leading-tight">24/7 Support</span>
                                    </div>
                                    <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-xl bg-slate-50 border border-slate-100 text-left">
                                        <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 flex-shrink-0">
                                            <Sparkles size={16} className="text-primary md:w-[18px] md:h-[18px]" />
                                        </div>
                                        <span className="text-[12px] md:text-sm font-semibold text-slate-700 leading-tight">Instant Setup</span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <Button
                                    onClick={handleGetOffer}
                                    variant="primary"
                                    size="lg"
                                    className="w-full group py-5 md:py-6 text-base md:text-lg rounded-xl"
                                >
                                    <MessageCircle className="mr-2 h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform" />
                                    Get Your Offer Now
                                </Button>

                                <p className="mt-4 md:mt-5 text-[10px] md:text-xs font-medium text-slate-400 uppercase tracking-widest">
                                    Limited time offer • Chat with us to claim
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PromoPopup;
