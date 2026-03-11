import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductsByPids } from '@/lib/services/whmcs.service';
import SocialBeePlanDetail from './SocialBeePlanDetail';

interface SinglePlanPageProps {
    params: Promise<{ slug: string }>;
}

const planMap: Record<string, number> = {
    'bootstrap': 20,
    'accelerate': 21,
    'pro': 22,
    'pro50': 23,
    'pro-50': 23,
    'pro100': 24,
    'pro-100': 24,
    'pro150': 25,
    'pro-150': 25
};

export async function generateMetadata({ params }: SinglePlanPageProps): Promise<Metadata> {
    const { slug } = await params;
    const pid = planMap[slug.toLowerCase()];
    if (!pid) return { title: 'Product Not Found' };

    const products = await getProductsByPids([pid]);
    const product = products[0];

    return {
        title: `${product?.name || 'SocialBee'} Plan | nodeMania`,
        description: `Everything you need to know about the ${product?.name} SocialBee plan. Get started with professional social media automation by nodeMania.`,
    };
}

export default async function SocialBeePlanPage({ params }: SinglePlanPageProps) {
    const { slug } = await params;
    const pid = planMap[slug.toLowerCase()];

    if (!pid) {
        notFound();
    }

    const products = await getProductsByPids([pid]);
    const product = products[0];

    if (!product) {
        notFound();
    }

    return (
        <SocialBeePlanDetail product={product} pid={pid} />
    );
}
