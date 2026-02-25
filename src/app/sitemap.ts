import { MetadataRoute } from 'next';
import { getAllPostSlugs } from '@/lib/services/wordpress.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: 'https://nodemania.com',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://nodemania.com/hosting',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://nodemania.com/domains',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://nodemania.com/blog',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
    ];

    // Dynamic blog post routes
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const posts = await getAllPostSlugs();
        blogRoutes = posts.map((post) => ({
            url: `https://nodemania.com/blog/${post.slug}`,
            lastModified: new Date(post.modified),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));
    } catch (error) {
        console.error('[Sitemap] Failed to fetch blog posts:', error);
    }

    return [...staticRoutes, ...blogRoutes];
}
