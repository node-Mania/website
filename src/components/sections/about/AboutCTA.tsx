'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { public_routes } from '@/lib/constants/routes';
import Link from 'next/link';

export default function AboutCTA() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-50" />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -ml-32 -mb-32" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative z-10 space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Ready to build your <br />
                            <span className="text-accent underline decoration-white/20 underline-offset-8">next big thing?</span>
                        </h2>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of businesses that trust NodeMania for their high-performance cloud infrastructure. Let's scale together.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 pt-4">
                            <Link href={public_routes.WebHosting}>
                                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-10 h-14 text-lg font-bold group">
                                    Get Started Now
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>

                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white/20 text-white hover:bg-white/10 px-10 h-14 text-lg font-bold"
                                onClick={() => window.Tawk_API?.maximize()}
                            >
                                <MessageSquare className="mr-2 w-5 h-5" />
                                Talk to an Expert
                            </Button>
                        </div>

                        <div className="pt-8 flex justify-center items-center gap-8 opacity-50">
                            <div className="text-sm text-white font-medium">30-Day Money Back</div>
                            <div className="w-1 h-1 bg-white/30 rounded-full" />
                            <div className="text-sm text-white font-medium">No Setup Fees</div>
                            <div className="w-1 h-1 bg-white/30 rounded-full" />
                            <div className="text-sm text-white font-medium">Free Migrations</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
