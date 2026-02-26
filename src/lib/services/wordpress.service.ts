import type {
  GetPostsResponse,
  GetPostBySlugResponse,
  GetCategoriesResponse,
  GetTagsResponse,
  GetAllSlugsResponse,
  WPPost,
  WPCategory,
  WPTag,
  WPPostsConnection,
} from "@/lib/types/wordpress.types";

// ─────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────

const GRAPHQL_ENDPOINT = "https://blog.nodemania.com/graphql";

// ─────────────────────────────────────────────
// Shared SEO fragment
// ─────────────────────────────────────────────

const SEO_FRAGMENT = `
  seo {
    title
    metaDesc
    canonical
    focuskw
    metaRobotsNoindex
    metaRobotsNofollow
    opengraphTitle
    opengraphDescription
    opengraphUrl
    opengraphSiteName
    opengraphPublishedTime
    opengraphModifiedTime
    opengraphImage {
      altText
      sourceUrl
      srcSet
    }
    twitterTitle
    twitterDescription
    twitterImage {
      altText
      sourceUrl
      srcSet
    }
    breadcrumbs {
      url
      text
    }
    readingTime
    schema {
      raw
    }
  }
`;

const POST_FIELDS = `
  id
  databaseId
  title
  slug
  date
  modified
  excerpt
  content
  featuredImage {
    node {
      sourceUrl
      altText
      srcSet
      mediaDetails {
        width
        height
      }
    }
  }
  author {
    node {
      name
      slug
      avatar {
        url
      }
    }
  }
  categories {
    nodes {
      id
      name
      slug
      count
    }
  }
  tags {
    nodes {
      id
      name
      slug
    }
  }
  ${SEO_FRAGMENT}
`;

// ─────────────────────────────────────────────
// Base GraphQL fetcher
// ─────────────────────────────────────────────

async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate: number = 300 // 5 minutes ISR
): Promise<T> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(
      `[WordPress] GraphQL request failed: ${res.status} ${res.statusText}`
    );
  }

  const json = await res.json();

  if (json.errors) {
    console.error("[WordPress] GraphQL errors:", json.errors);
    throw new Error(
      `[WordPress] GraphQL errors: ${json.errors
        .map((e: { message: string }) => e.message)
        .join(", ")}`
    );
  }

  return json.data as T;
}

// ─────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────

/**
 * Fetch a paginated list of posts, optionally filtered by category slug or search term.
 */
export async function getPosts(
  first: number = 12,
  after: string | null = null,
  categorySlug: string | null = null,
  search: string | null = null
): Promise<WPPostsConnection> {
  const whereClause: string[] = [];

  if (categorySlug) {
    whereClause.push(`categoryName: "${categorySlug}"`);
  }
  if (search) {
    whereClause.push(`search: "${search}"`);
  }

  const whereString =
    whereClause.length > 0 ? `, where: { ${whereClause.join(", ")} }` : "";

  const query = `
    query GetPosts($first: Int!, $after: String) {
      posts(first: $first, after: $after${whereString}) {
        nodes {
          ${POST_FIELDS}
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  const data = await fetchGraphQL<GetPostsResponse>(query, {
    first,
    after,
  });

  return data.posts;
}

/**
 * Fetch a single post by its slug. Returns null if not found.
 */
export async function getPostBySlug(
  slug: string
): Promise<WPPost | null> {
  const query = `
    query GetPostBySlug($slug: String!) {
      postBy(slug: $slug) {
        ${POST_FIELDS}
      }
    }
  `;

  const data = await fetchGraphQL<GetPostBySlugResponse>(query, { slug });
  return data.postBy;
}

/**
 * Fetch the latest N posts (for the featured section).
 */
export async function getLatestPosts(
  count: number = 3
): Promise<WPPost[]> {
  const query = `
    query GetLatestPosts($first: Int!) {
      posts(first: $first) {
        nodes {
          ${POST_FIELDS}
        }
      }
    }
  `;

  const data = await fetchGraphQL<GetPostsResponse>(query, { first: count });
  return data.posts.nodes;
}

/**
 * Fetch related posts by category IDs, excluding a given slug.
 */
export async function getRelatedPosts(
  categorySlug: string,
  excludeSlug: string,
  count: number = 3
): Promise<WPPost[]> {
  const query = `
    query GetRelatedPosts($first: Int!) {
      posts(first: $first, where: { categoryName: "${categorySlug}" }) {
        nodes {
          ${POST_FIELDS}
        }
      }
    }
  `;

  const data = await fetchGraphQL<GetPostsResponse>(query, {
    first: count + 1, // fetch one extra to account for excluding current post
  });

  return data.posts.nodes
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, count);
}

/**
 * Fetch all categories (with post counts).
 */
export async function getCategories(): Promise<WPCategory[]> {
  const query = `
    query GetCategories {
      categories(first: 100) {
        nodes {
          id
          name
          slug
          count
        }
      }
    }
  `;

  const data = await fetchGraphQL<GetCategoriesResponse>(query);
  // Filter out categories with 0 posts
  return data.categories.nodes.filter((cat) => (cat.count ?? 0) > 0);
}

/**
 * Fetch a single category by its slug.
 */
export async function getCategoryBySlug(
  slug: string
): Promise<WPCategory | null> {
  const query = `
    query GetCategoryBySlug($slug: ID!) {
      category(id: $slug, idType: SLUG) {
        id
        name
        slug
        count
        description
      }
    }
  `;

  try {
    const data = await fetchGraphQL<{ category: WPCategory }>(query, { slug });
    return data.category;
  } catch (error) {
    console.error(`[WordPress] Failed to fetch category by slug: ${slug}`, error);
    return null;
  }
}


/**
 * Fetch all tags.
 */
export async function getTags(): Promise<WPTag[]> {
  const query = `
    query GetTags {
      tags(first: 100) {
        nodes {
          id
          name
          slug
        }
      }
    }
  `;

  const data = await fetchGraphQL<GetTagsResponse>(query);
  return data.tags.nodes;
}

/**
 * Fetch all post slugs for the sitemap.
 */
export async function getAllPostSlugs(): Promise<
  Array<{ slug: string; modified: string }>
> {
  const query = `
    query GetAllSlugs {
      posts(first: 1000) {
        nodes {
          slug
          modified
        }
      }
    }
  `;

  const data = await fetchGraphQL<GetAllSlugsResponse>(query, {}, 3600);
  return data.posts.nodes;
}
