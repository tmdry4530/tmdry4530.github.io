import { getAllPostsMeta } from "@/lib/posts";
import PostListClient from "@/components/PostListClient";

export const dynamic = "error";

export default function Home() {
  const posts = getAllPostsMeta({ includePrivate: false });
  const types = Array.from(new Set(posts.map((p) => p.type).filter(Boolean)));
  const categories = Array.from(
    new Set(posts.map((p) => p.category || "").filter(Boolean))
  );
  const tags = Array.from(
    new Set(posts.flatMap((p) => p.tags || []).filter(Boolean))
  );

  return (
    <div className="space-y-6">
      <header className="mb-2">
        <h1 className="text-3xl font-bold">블로그</h1>
        <p className="text-sm text-gray-600">노션 ↔︎ GitHub Pages 자동 배포</p>
      </header>
      <PostListClient
        posts={posts}
        types={types}
        categories={categories}
        tags={tags}
      />
    </div>
  );
}
