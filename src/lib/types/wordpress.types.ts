// ─────────────────────────────────────────────
// WordPress GraphQL Types
// ─────────────────────────────────────────────

/** Yoast SEO data from WPGraphQL Yoast SEO extension */
export interface WPSeo {
    title: string;
    metaDesc: string;
    canonical: string;
    focuskw: string;
    metaRobotsNoindex: string;
    metaRobotsNofollow: string;
    opengraphTitle: string;
    opengraphDescription: string;
    opengraphUrl: string;
    opengraphSiteName: string;
    opengraphPublishedTime: string;
    opengraphModifiedTime: string;
    opengraphImage: {
        altText: string;
        sourceUrl: string;
        srcSet: string;
    } | null;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: {
        altText: string;
        sourceUrl: string;
        srcSet: string;
    } | null;
    breadcrumbs: Array<{
        url: string;
        text: string;
    }>;
    readingTime: number;
    schema: {
        raw: string;
    };
}

/** A featured image / media item */
export interface WPFeaturedImage {
    node: {
        sourceUrl: string;
        altText: string;
        srcSet: string;
        mediaDetails: {
            width: number;
            height: number;
        };
    };
}

/** Author information */
export interface WPAuthor {
    node: {
        name: string;
        slug: string;
        avatar: {
            url: string;
        };
    };
}

/** Category attached to a post */
export interface WPCategory {
    id: string;
    name: string;
    slug: string;
    count: number | null;
}

/** Tag attached to a post */
export interface WPTag {
    id: string;
    name: string;
    slug: string;
}

/** A single WordPress post */
export interface WPPost {
    id: string;
    databaseId: number;
    title: string;
    slug: string;
    date: string;
    modified: string;
    excerpt: string;
    content: string;
    featuredImage: WPFeaturedImage | null;
    author: WPAuthor;
    categories: {
        nodes: WPCategory[];
    };
    tags: {
        nodes: WPTag[];
    };
    seo: WPSeo;
}

/** Cursor-based pagination info */
export interface WPPageInfo {
    hasNextPage: boolean;
    endCursor: string | null;
}

/** Connection response shape for posts */
export interface WPPostsConnection {
    nodes: WPPost[];
    pageInfo: WPPageInfo;
}

/** GraphQL response wrapper for posts */
export interface GetPostsResponse {
    posts: WPPostsConnection;
}

/** GraphQL response wrapper for single post by slug */
export interface GetPostBySlugResponse {
    postBy: WPPost | null;
}

/** GraphQL response wrapper for categories */
export interface GetCategoriesResponse {
    categories: {
        nodes: WPCategory[];
    };
}

/** GraphQL response wrapper for tags */
export interface GetTagsResponse {
    tags: {
        nodes: WPTag[];
    };
}

/** GraphQL response wrapper for post slugs (sitemap) */
export interface GetAllSlugsResponse {
    posts: {
        nodes: Array<{ slug: string; modified: string }>;
    };
}
