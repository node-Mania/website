'use client';

import { Rocket, Headset, Award } from 'lucide-react';

export function WhyNodeManiaSection() {
    return (
        <section className="py-20 w-full">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Why nodeMania?</h2>
                    <p className="text-slate-600">
                        We are dedicated to your success with premium tools and support.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="border border-slate-200 rounded-xl p-8 text-center">
                        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                            <Rocket className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">Unmatched Performance</h3>
                        <p className="text-slate-600">
                            Our optimized stack ensures your website performs at its peak potential at all times.
                        </p>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-8 text-center">
                        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                            <Headset className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">Expert Support</h3>
                        <p className="text-slate-600">
                            Our team of hosting experts is available 24/7 to help you resolve any issues quickly.
                        </p>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-8 text-center">
                        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                            <Award className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">Satisfaction Guaranteed</h3>
                        <p className="text-slate-600">
                            We are confident you&apos;ll love us. If not, get your money back within 30 days. No questions asked.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
