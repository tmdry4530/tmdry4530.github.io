import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

export type PostMeta = {
  title: string;
  slug: string;
  status: string;
  type: string;
  category?: string;
  tags: string[];
  summary?: string;
  thumbnail?: string;
  date: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "posts");

export function getAllSlugs() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostMeta(slug: string): PostMeta {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);

  return {
    title: String(data.title ?? "Untitled"),
    slug: String(data.slug ?? slug),
    status: String(data.status ?? "public").toLowerCase(),
    type: String(data.type ?? "post"),
    category: data.category ? String(data.category) : "",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    summary: data.summary ? String(data.summary) : "",
    thumbnail: data.thumbnail ? String(data.thumbnail) : "",
    date: data.date ? String(data.date) : "",
  };
}

export function getAllPostsMeta(opts?: {
  includePrivate?: boolean;
  type?: string;
  category?: string;
}) {
  let posts = getAllSlugs().map(getPostMeta);
  if (!opts?.includePrivate) posts = posts.filter((p) => p.status === "public");
  if (opts?.type) posts = posts.filter((p) => p.type === opts.type);
  if (opts?.category) posts = posts.filter((p) => p.category === opts.category);
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostHtml(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);
  return String(processed);
}
