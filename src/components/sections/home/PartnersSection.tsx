'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
    { name: 'cPanel', logo: '' },
    { name: 'Cloudlinux', logo: '' },
    { name: 'LiteSpeed', logo: '' },
    { name: 'Softaculous', logo: '' },
    { name: 'Imunify360', logo: '' },
    { name: 'JetApps', logo: '' },
    { name: 'Cloudflare', logo: '' },
    { name: 'Docker', logo: '' },
];

export function PartnersSection() {
    return (
        <section className="py-12 bg-primary w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                <p className="text-xs font-bold text-white/70 uppercase tracking-widest">
                    Trusted Technology Partners
                </p>
            </div>

            <div className="relative flex w-full">
                {/* Gradient Masks for smooth fade out at edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-primary to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-primary to-transparent" />

                <motion.div
                    className="flex items-center gap-16 whitespace-nowrap"
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {/* Double the list for seamless loop */}
                    {[...partners, ...partners].map((partner, idx) => (
                        <div key={`${partner.name}-${idx}`} className="flex items-center justify-center min-w-[150px]">
                            {partner.logo ? (
                                <div className="relative h-12 w-32 opacity-80 hover:opacity-100 transition-opacity">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        fill
                                        className="object-contain brightness-0 invert"
                                    />
                                </div>
                            ) : (
                                <span className="text-2xl font-bold text-white/50 hover:text-white transition-colors cursor-default">
                                    {partner.name}
                                </span>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
