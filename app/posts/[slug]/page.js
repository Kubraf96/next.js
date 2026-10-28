import styles from "./page.module.css";
import Link from "next/link";
export default async function PostPage({ params }) {
  const { slug } = await params;
  // …

  const response = await fetch(
    `${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts?slug=${slug}`,
  );
  // WordPress always returns an array, even for a single match
  const posts = await response.json();
  const post = posts[0];

  if (!post) {
    notFound();
  }
  return (
    <main>
      <article className={styles.post}>
        <Link href="/posts">← All posts</Link>
        <time className={styles.date} dateTime={post.date}>
          {date}
        </time>
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <div
          className="wp-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </main>
  );
}