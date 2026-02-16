'use client';

import { Wind, Leaf, Footprints } from 'lucide-react';
import Image from 'next/image';

export function GreenHostingSection() {
    return (
        <section className="py-20 bg-green-50 w-full">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 items-center gap-12">
                    <div>
                        <span className="inline-block px-4 py-1 bg-white/80 text-green-700 rounded-full text-xs font-semibold mb-4">
                            Eco-Friendly Hosting
                        </span>
                        <h2 className="text-4xl font-bold text-green-900 mb-4">Host Green. Grow Clean.</h2>
                        <p className="text-lg text-green-800 mb-8">
                            Green Web hosting powered by 100% renewable energy. Join us in
                            reducing the internet&apos;s carbon footprint without compromising on
                            performance.
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white/60 backdrop-blur border border-green-200 p-6 rounded-lg text-center">
                                <Wind className="w-8 h-8 text-green-700 mx-auto mb-3" />
                                <div className="font-semibold text-green-900 text-sm">100% Renewable Energy</div>
                            </div>
                            <div className="bg-white/60 backdrop-blur border border-green-200 p-6 rounded-lg text-center">
                                <Leaf className="w-8 h-8 text-green-700 mx-auto mb-3" />
                                <div className="font-semibold text-green-900 text-sm">Green Data Centers</div>
                            </div>
                            <div className="bg-white/60 backdrop-blur border border-green-200 p-6 rounded-lg text-center">
                                <Footprints className="w-8 h-8 text-green-700 mx-auto mb-3" />
                                <div className="font-semibold text-green-900 text-sm">Low Carbon Footprint</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="relative w-4/5 aspect-square rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/green-server.png"
                                alt="Green Hosting"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
