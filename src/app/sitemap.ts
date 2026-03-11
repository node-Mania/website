import { MetadataRoute } from 'next';
import { getAllPostSlugs, getCategories } from '@/lib/services/wordpress.service';
import { LEGAL_DOCS } from '@/lib/legal-data';

const BASE_URL = 'https://nodemania.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Static Routes
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
        { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
        { url: `${BASE_URL}/blog/category`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
        { url: `${BASE_URL}/business-email`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/business-email/ox-app-suite`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${BASE_URL}/business-email/ox-app-suite-productivity`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${BASE_URL}/business-hosting`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/domains`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/email-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/legal`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
        { url: `${BASE_URL}/social-bee`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/web-hosting`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/web-security/codeguard`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${BASE_URL}/web-security/nordvpn`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${BASE_URL}/web-security/site-monitoring`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${BASE_URL}/web-security/ssl-certificate`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${BASE_URL}/wordpress-hosting`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ];

    // 2. Dynamic Blog Posts
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const posts = await getAllPostSlugs();
        blogRoutes = posts.map((post) => ({
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: new Date(post.modified),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));
    } catch (error) {
        console.error('[Sitemap] Failed to fetch blog posts:', error);
    }

    // 3. Dynamic Blog Categories
    let categoryRoutes: MetadataRoute.Sitemap = [];
    try {
        const categories = await getCategories();
        categoryRoutes = categories.flatMap((cat) => [
            {
                url: `${BASE_URL}/blog/category/${cat.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.5,
            },
            {
                url: `${BASE_URL}/category/${cat.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.5,
            }
        ]);
    } catch (error) {
        console.error('[Sitemap] Failed to fetch categories:', error);
    }

    // 4. Legal Documents
    const legalRoutes: MetadataRoute.Sitemap = LEGAL_DOCS.map((doc) => ({
        url: `${BASE_URL}/legal/${doc.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3,
    }));

    // 5. SocialBee Plans
    const socialBeeSlugs = ['bootstrap', 'accelerate', 'pro', 'pro50', 'pro100', 'pro150'];
    const socialBeeRoutes: MetadataRoute.Sitemap = socialBeeSlugs.map((slug) => ({
        url: `${BASE_URL}/social-bee/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    // 6. Email Services Plans
    const emailServicesSlugs = [
        'incoming-scanning',
        'outgoing-scanning',
        'incoming-and-archiving-bundle',
        'outgoing-and-archiving-bundle',
        'incoming-and-outgoing-bundle',
        'incoming-outgoing-and-archiving-bundle',
    ];
    const emailServicesRoutes: MetadataRoute.Sitemap = emailServicesSlugs.map((slug) => ({
        url: `${BASE_URL}/email-services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [
        ...staticRoutes,
        ...blogRoutes,
        ...categoryRoutes,
        ...legalRoutes,
        ...socialBeeRoutes,
        ...emailServicesRoutes,
    ];
}

