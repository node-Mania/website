import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://nodemaina.com',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://nodemaina.com/hosting',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://nodemaina.com/domains',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ];
}
