'use client';

import { Users, Server, Headset, Globe } from 'lucide-react';

export function TrustBar() {
    return (
        <div className="bg-slate-100 border-y border-slate-200 py-8 w-full">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex items-center gap-4">
                        <Users className="w-6 h-6 text-primary" />
                        <div>
                            <div className="font-semibold text-slate-900">10,000+</div>
                            <div className="text-sm text-slate-600">Happy Customers</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Server className="w-6 h-6 text-primary" />
                        <div>
                            <div className="font-semibold text-slate-900">99.9%</div>
                            <div className="text-sm text-slate-600">Uptime Guarantee</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Headset className="w-6 h-6 text-primary" />
                        <div>
                            <div className="font-semibold text-slate-900">24/7/365</div>
                            <div className="text-sm text-slate-600">Expert Support</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Globe className="w-6 h-6 text-primary" />
                        <div>
                            <div className="font-semibold text-slate-900">Global</div>
                            <div className="text-sm text-slate-600">Data Centers</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
