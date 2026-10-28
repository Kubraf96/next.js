import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format";
import { getPostBySlug } from "@/lib/wordpress";

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const date = formatDate(post.date);
  const image = post._embedded?.["wp:featuredmedia"]?.[0];

  return (
    <main>
      <article>
        <Link href="/posts">← Tilbage til alle opslag</Link>
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        {image && (
          <img
            className="featured-image"
            src={image.source_url}
            alt={image.alt_text ?? ""}
          />
        )}
        <time dateTime={post.date}>{date}</time>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </article>
    </main>
  );
}
