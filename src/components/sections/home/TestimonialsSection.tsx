'use client';

import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

const testimonials = [
    {
        name: 'Sarah Jenkins',
        role: 'CEO, TechStart',
        avatar: 'https://i.pravatar.cc/150?u=1',
        text: 'Moving to nodeMania was the best decision for our business. Our site speed improved by 200% instantly.',
    },
    {
        name: 'Mike Ross',
        role: 'Freelance Developer',
        avatar: 'https://i.pravatar.cc/150?u=2',
        text: 'The customer support is incredible. They helped me migrate my WordPress site in the middle of the night.',
    },
    {
        name: 'Emily Chen',
        role: 'Blogger',
        avatar: 'https://i.pravatar.cc/150?u=3',
        text: 'Reliable uptime and great features like daily backups included. Highly recommended for small businesses.',
    },
    {
        name: 'David Martinez',
        role: 'E-commerce Owner',
        avatar: 'https://i.pravatar.cc/150?u=4',
        text: 'The performance optimization tools helped us handle Black Friday traffic without any downtime. Exceptional service!',
    },
    {
        name: 'Lisa Anderson',
        role: 'Digital Agency',
        avatar: 'https://i.pravatar.cc/150?u=5',
        text: 'We manage over 50 client websites on nodeMania. The white-label options and priority support are game-changers.',
    },
    {
        name: 'James Wilson',
        role: 'Startup Founder',
        avatar: 'https://i.pravatar.cc/150?u=6',
        text: 'Scaling from 100 to 100,000 visitors was seamless. The infrastructure just works, allowing us to focus on growth.',
    },
];

export function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const itemsPerSlide = 3;
    const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

    const nextSlide = useCallback(() => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
            setTimeout(() => setIsTransitioning(false), 500);
        }
    }, [totalSlides, isTransitioning]);

    const prevSlide = useCallback(() => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
            setTimeout(() => setIsTransitioning(false), 500);
        }
    }, [totalSlides, isTransitioning]);

    const goToSlide = (index: number) => {
        if (!isTransitioning && index !== currentIndex) {
            setIsTransitioning(true);
            setCurrentIndex(index);
            setTimeout(() => setIsTransitioning(false), 500);
        }
    };

    // Auto-play carousel
    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                nextSlide();
            }, 5000); // Change slide every 5 seconds

            return () => clearInterval(interval);
        }
    }, [isHovered, nextSlide]);

    const getCurrentTestimonials = () => {
        const start = currentIndex * itemsPerSlide;
        const end = start + itemsPerSlide;
        return testimonials.slice(start, end);
    };

    return (
        <section className="py-20 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
                    What Our Customers Say
                </h2>

                <div
                    className="relative px-12"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Carousel Container with padding to prevent clipping */}
                    <div className="overflow-visible py-4">
                        <div
                            className="grid md:grid-cols-3 gap-6 transition-all duration-500 ease-in-out"
                            style={{
                                opacity: isTransitioning ? 0 : 1,
                                transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
                            }}
                        >
                            {getCurrentTestimonials().map((testimonial, idx) => (
                                <div
                                    key={`${currentIndex}-${idx}`}
                                    className="group border border-slate-200 rounded-xl p-8 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary/50 cursor-pointer bg-white h-full"
                                >
                                    <div className="flex gap-1 mb-4 text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" />
                                        ))}
                                    </div>
                                    <p className="text-slate-700 mb-6 flex-1 group-hover:text-slate-900 transition-colors duration-300 min-h-[80px]">
                                        &quot;{testimonial.text}&quot;
                                    </p>
                                    <div className="flex items-center gap-3 mt-auto">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-200 group-hover:ring-primary transition-all duration-300 flex-shrink-0">
                                            <Image
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm text-slate-900 group-hover:text-primary transition-colors duration-300">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-sm text-slate-600">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        disabled={isTransitioning}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded-full p-3 shadow-lg hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:scale-110 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous testimonials"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={isTransitioning}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded-full p-3 shadow-lg hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:scale-110 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next testimonials"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {[...Array(totalSlides)].map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                disabled={isTransitioning}
                                className={`h-2 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${idx === currentIndex
                                        ? 'w-8 bg-primary'
                                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>

                    {/* Auto-play indicator */}
                    {!isHovered && (
                        <div className="text-center mt-4">
                            <p className="text-xs text-slate-400">Hover to pause</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
