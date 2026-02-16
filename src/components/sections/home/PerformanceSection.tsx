'use client';

import { Zap, ShieldCheck, TrendingUp } from 'lucide-react';

export function PerformanceSection() {
    return (
        <section className="py-20 w-full">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 items-center gap-12">
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-secondary to-secondary/30">
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <div className="text-center">
                                <ShieldCheck className="w-24 h-24 mx-auto mb-4 opacity-30" />
                                <p className="text-sm">Security Illustration</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            Designed for Performance &amp; Security
                        </h2>
                        <p className="text-slate-600 mb-8">
                            We don&apos;t just host your site; we optimize it. Our infrastructure
                            is built to handle traffic spikes while keeping threats at bay.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                                    <Zap className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Blazing Fast Speed</h3>
                                    <p className="text-sm text-slate-600">
                                        NVMe SSD storage and LiteSpeed servers ensure your site loads instantly.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Ironclad Security</h3>
                                    <p className="text-sm text-slate-600">
                                        Advanced DDoS protection and custom firewalls keep your data safe.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Seamless Scalability</h3>
                                    <p className="text-sm text-slate-600">
                                        Upgrade resources in one click as your business grows.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
