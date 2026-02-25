import Link from "next/link";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";

export function BlogCTA() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B0E14] via-[#16335a] to-[#0B0E14] p-10 md:p-16 text-center">
                    {/* Decorative glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-500/15 rounded-full blur-[100px]" />

                    <div className="relative z-10">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
                            Start Your Journey
                        </span>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                            Ready to Host Your Website
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                                with Lightning Speed?
                            </span>
                        </h2>

                        <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                            Join thousands of businesses trusted by nodeMania. Get
                            enterprise-grade hosting with 99.9% uptime, free SSL, and 24/7
                            expert support.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap justify-center gap-4 mb-10">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm">
                                <Zap className="w-4 h-4 text-yellow-400" />
                                NVMe Storage
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm">
                                <Shield className="w-4 h-4 text-green-400" />
                                Free SSL Certificate
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm">
                                <Clock className="w-4 h-4 text-blue-400" />
                                99.9% Uptime SLA
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/web-hosting"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-base hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                            >
                                Get Started Now
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/business-hosting"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-base hover:bg-white/20 transition-all"
                            >
                                View All Plans
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
