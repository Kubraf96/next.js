function getApiUrl() {
  const wordpressUrl = process.env.WORDPRESS_URL;

  if (!wordpressUrl) {
    throw new Error("WORDPRESS_URL is not configured.");
  }

  return `${wordpressUrl.replace(/\/+$/, "")}/wp-json/wp/v2`;
}

async function fetchWordPress(endpoint) {
  const response = await fetch(`${getApiUrl()}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`WordPress responded with ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("WordPress returned an unexpected response.");
  }

  return data;
}

export async function getPosts() {
  return fetchWordPress("posts?_embed");
}

export async function getLatestPosts() {
  return fetchWordPress("posts?per_page=3&_embed");
}

export async function getPostBySlug(slug) {
  const posts = await fetchWordPress(
    `posts?slug=${encodeURIComponent(slug)}&_embed`,
  );
  return posts[0] ?? null;
}

export async function getPageBySlug(slug) {
  const pages = await fetchWordPress(
    `pages?slug=${encodeURIComponent(slug)}&_embed`,
  );
  return pages[0] ?? null;
}
