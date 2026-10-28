import PostList from "@/components/PostList";
import { getLatestPosts } from "@/lib/wordpress";

export default async function Home() {
  const posts = await getLatestPosts();

  return (
    <main>
      <h1>Stories from Aarhus</h1>
      <PostList posts={posts} />
    </main>
  );
}
