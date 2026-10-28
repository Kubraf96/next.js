import Link from "next/link";
import { formatDate } from "@/lib/format";
import styles from "./PostCard.module.css";

export default function PostCard({ post }) {
    const date = formatDate(post.date);
    const image = post._embedded?.["wp:featuredmedia"]?.[0];
    const categories = post._embedded?.["wp:term"]?.[0] ?? [];

    return (
        <article className={styles.card}>
            {image && (
                <img
                    className={styles.image}
                    src={image.source_url}
                    alt={image.alt_text ?? ""}
                />
            )}
            {categories.length > 0 && (
                <ul className={styles.categories}>
                    {categories.map((category) => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ul>
            )}
            <time className={styles.date} dateTime={post.date}>{date}</time>
            <h2
                className={styles.title}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div
                className={styles.excerpt}
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <Link href={`/posts/${post.slug}`} className={styles.link}>
                Read more
            </Link>
        </article>
    );
}