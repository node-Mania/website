'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Search, Server, Cloud, Zap, LayoutTemplate, Layers, CheckCircle, ArrowRight, Globe } from 'lucide-react';
import Image from 'next/image';
import { DomainSearchBar } from '@/components/shared/DomainSearchBar';

const slides = [
    {
        id: 'domain',
        label: 'Domain Names',
        title: 'Find Your Perfect Domain Name',
        subtitle: 'Start your journey with the perfect address. Secure your brand identity today with our competitive domain pricing.',
        icon: Globe,
        image: '/home-2-hero.png',
        color: 'from-blue-500 to-cyan-400',
        hasSearch: true,
        bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
        id: 'hosting',
        label: 'Web Hosting',
        title: 'Blazing Fast Web Hosting',
        subtitle: 'Experience lightning speeds with our NVMe SSD storage and LiteSpeed servers. 99.9% uptime guaranteed.',
        icon: Zap,
        image: '/green-server.png',
        color: 'from-violet-500 to-purple-400',
        hasSearch: false,
        bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
        id: 'vps',
        label: 'Cloud VPS',
        title: 'Super Fast Cloud VPS',
        subtitle: 'Full root access, dedicated resources, and instant scalability. Calculate your power and deploy in seconds.',
        icon: Cloud,
        image: '/home-2-hero.png',
        color: 'from-sky-500 to-indigo-400',
        hasSearch: false,
        bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
        id: 'wordpress',
        label: 'WordPress',
        title: 'High Performance WordPress',
        subtitle: 'Managed WordPress hosting optimized for security and speed. Auto-updates, daily backups, and WP-CLI included.',
        icon: LayoutTemplate,
        image: '/green-server.png',
        color: 'from-emerald-500 to-teal-400',
        hasSearch: false,
        bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
        id: 'services',
        label: 'All Services',
        title: 'Complete Digital Solutions',
        subtitle: 'From SSL certificates to professional email hosting. We provide everything you need to grow your online presence.',
        icon: Layers,
        image: '/home-2-hero.png',
        color: 'from-orange-500 to-amber-400',
        hasSearch: false,
        bgGradient: 'from-blue-50 to-cyan-50',
    },
];

export function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 6000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const handleDotClick = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const currentSlide = slides[currentIndex];

    // Animation variants
    const slideVariants: Variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
            },
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
            },
        }),
    };

    return (
        <section className="relative pt-32 pb-20 w-full overflow-hidden bg-white border-b border-slate-200">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-100/50 rounded-full blur-[100px] opacity-50 animate-pulse" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-[100px] opacity-30" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            </div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 items-center gap-12 min-h-[500px]">
                    {/* Content Side */}
                    <div className="relative">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="space-y-6"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span className={`inline-block px-4 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-bold mb-4 shadow-sm border border-slate-100 bg-gradient-to-r ${currentSlide.color} bg-clip-text text-transparent`}>
                                        {currentSlide.label}
                                    </span>
                                    <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                                        {currentSlide.title}
                                    </h1>
                                    <p className="text-lg text-slate-600 mb-8 max-w-lg">
                                        {currentSlide.subtitle}
                                    </p>

                                    {/* Domain Search or CTA Buttons */}
                                    {currentSlide.hasSearch ? (
                                        // <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-100 flex flex-col sm:flex-row gap-2 max-w-lg">
                                        //     <input
                                        //         type="text"
                                        //         placeholder="Search your domain..."
                                        //         className="flex-1 px-4 py-3 rounded-lg outline-none text-slate-700 placeholder:text-slate-400 bg-transparent"
                                        //     />
                                        //     <button className="px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md">
                                        //         <Search className="w-5 h-5" />
                                        //         Search
                                        //     </button>
                                        // </div>
                                        <DomainSearchBar variant="minimal" />
                                    ) : (
                                        <div className="flex flex-wrap gap-4">
                                            <button className="px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
                                                Get Started
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                            <button className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-bold hover:bg-slate-50 transition-all shadow-sm hover:shadow-md">
                                                Learn More
                                            </button>
                                        </div>
                                    )}

                                    {/* Trust Badges */}
                                    <div className="flex items-center gap-6 mt-10 opacity-80">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            <span className="text-sm font-semibold text-slate-700">30-Day Guarantee</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            <span className="text-sm font-semibold text-slate-700">24/7 Support</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Visual Side */}
                    <div className="relative flex justify-center items-center">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={{
                                    enter: (direction: number) => ({ opacity: 0, scale: 0.8, x: direction > 0 ? 100 : -100 }),
                                    center: { opacity: 1, scale: 1, x: 0 },
                                    exit: (direction: number) => ({ opacity: 0, scale: 0.8, x: direction < 0 ? 100 : -100 })
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                className="relative w-full max-w-md aspect-square"
                            >


                                {/* Central Animated Image */}
                                <motion.div
                                    key={currentSlide.id}
                                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 0.1
                                    }}
                                    className="relative z-10 w-full h-full flex items-center justify-center p-8"
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={currentSlide.image}
                                            alt={currentSlide.title}
                                            fill
                                            className="object-contain drop-shadow-2xl"
                                            priority
                                        />
                                    </div>
                                </motion.div>




                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Slider Controls */}
                <div className="flex justify-center mt-12 gap-3">
                    {slides.map((slide, idx) => (
                        <button
                            key={slide.id}
                            onClick={() => handleDotClick(idx)}
                            className={`h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-10 bg-primary' : 'w-3 bg-slate-300 hover:bg-slate-400'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-white/50 to-transparent" />
        </section>
    );
}
