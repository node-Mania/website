'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';

type PlanType = 'web-hosting' | 'wordpress' | 'cloud-vps' | 'business';

interface Plan {
    name: string;
    description: string;
    price: string;
    popular?: boolean;
    features: string[];
}

const pricingData: Record<PlanType, Plan[]> = {
    'web-hosting': [
        {
            name: 'Starter',
            description: 'Perfect for personal blogs',
            price: '$2.99',
            features: [
                '1 Website',
                '10 GB SSD Storage',
                'Free SSL Certificate',
                '5 Email Accounts',
                '100 GB Bandwidth',
            ],
        },
        {
            name: 'Professional',
            description: 'For growing businesses',
            price: '$5.99',
            popular: true,
            features: [
                'Unlimited Websites',
                '50 GB SSD Storage',
                'Free Domain for 1st Year',
                'Unlimited Email Accounts',
                'Daily Backups (CodeGuard)',
                'Unmetered Bandwidth',
            ],
        },
        {
            name: 'Enterprise',
            description: 'Maximum power & speed',
            price: '$12.99',
            features: [
                'Unlimited Everything',
                '100 GB NVMe Storage',
                'Free Dedicated IP',
                'Priority Support',
                'SiteLock Security',
                'Advanced DDoS Protection',
            ],
        },
    ],
    'wordpress': [
        {
            name: 'WP Starter',
            description: 'Perfect for WordPress beginners',
            price: '$3.99',
            features: [
                '1 WordPress Site',
                '20 GB SSD Storage',
                'Free WordPress Installation',
                'Automatic Updates',
                'Free SSL Certificate',
            ],
        },
        {
            name: 'WP Pro',
            description: 'For professional WordPress sites',
            price: '$7.99',
            popular: true,
            features: [
                'Unlimited WordPress Sites',
                '75 GB SSD Storage',
                'WP-CLI & Git Integration',
                'Staging Environment',
                'Premium Themes Included',
                'Advanced Caching',
            ],
        },
        {
            name: 'WP Enterprise',
            description: 'High-traffic WordPress sites',
            price: '$15.99',
            features: [
                'Unlimited Everything',
                '150 GB NVMe Storage',
                'Dedicated Resources',
                'White Label Options',
                'Priority WP Support',
                'Malware Removal',
            ],
        },
    ],
    'cloud-vps': [
        {
            name: 'VPS Basic',
            description: 'Entry-level VPS hosting',
            price: '$19.99',
            features: [
                '2 CPU Cores',
                '4 GB RAM',
                '80 GB SSD Storage',
                'Full Root Access',
                '2 TB Bandwidth',
            ],
        },
        {
            name: 'VPS Advanced',
            description: 'For demanding applications',
            price: '$39.99',
            popular: true,
            features: [
                '4 CPU Cores',
                '8 GB RAM',
                '160 GB SSD Storage',
                'Free cPanel License',
                '4 TB Bandwidth',
                'Dedicated IP',
            ],
        },
        {
            name: 'VPS Premium',
            description: 'Maximum VPS performance',
            price: '$79.99',
            features: [
                '8 CPU Cores',
                '16 GB RAM',
                '320 GB NVMe Storage',
                'Managed Services',
                'Unlimited Bandwidth',
                'Priority Support',
            ],
        },
    ],
    'business': [
        {
            name: 'Business Starter',
            description: 'For small businesses',
            price: '$24.99',
            features: [
                '10 Websites',
                '100 GB SSD Storage',
                'Free Business Email',
                'Daily Backups',
                'Free SSL Certificates',
            ],
        },
        {
            name: 'Business Pro',
            description: 'For growing enterprises',
            price: '$49.99',
            popular: true,
            features: [
                'Unlimited Websites',
                '200 GB SSD Storage',
                'Advanced Security Suite',
                'Dedicated IP',
                'Priority Support 24/7',
                'Performance Optimization',
            ],
        },
        {
            name: 'Business Elite',
            description: 'Enterprise-grade hosting',
            price: '$99.99',
            features: [
                'Unlimited Everything',
                '500 GB NVMe Storage',
                'White Label Hosting',
                'Custom Solutions',
                'Dedicated Account Manager',
                'SLA Guarantee 99.99%',
            ],
        },
    ],
};

export function PricingSection() {
    const [activeTab, setActiveTab] = useState<PlanType>('web-hosting');

    const tabs = [
        { id: 'web-hosting' as PlanType, label: 'Web Hosting' },
        { id: 'wordpress' as PlanType, label: 'WordPress' },
        { id: 'cloud-vps' as PlanType, label: 'Cloud VPS' },
        { id: 'business' as PlanType, label: 'Business' },
    ];

    const currentPlans = pricingData[activeTab];

    return (
        <section className="py-20 w-full">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Perfect Plan</h2>
                    <p className="text-slate-600">Scalable solutions for every stage of your growth.</p>
                </div>

                {/* Tab Group */}
                <div className="flex justify-center gap-2 mb-10 bg-slate-100 p-1 rounded-lg w-fit mx-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${activeTab === tab.id
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {currentPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`group relative rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${plan.popular
                                    ? 'border-2 border-primary shadow-lg'
                                    : 'border border-slate-200 hover:border-primary/50'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">{plan.name}</h3>
                            <p className="text-sm text-slate-600 mb-6">{plan.description}</p>
                            <div className="mb-6">
                                <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                                <span className="text-slate-600">/mo</span>
                            </div>
                            <button
                                className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 mb-6 ${plan.popular
                                        ? 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg'
                                        : 'border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-primary/50'
                                    }`}
                            >
                                Select Plan
                            </button>
                            <ul className="space-y-3">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
