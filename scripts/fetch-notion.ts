import "dotenv/config";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

const DB_ID = process.env.NOTION_DATABASE_ID!;
if (!DB_ID) {
  console.error("Missing NOTION_DATABASE_ID");
  process.exit(1);
}

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content", "posts");
const THUMBS_DIR = path.join(ROOT, "public", "thumbnails");

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

async function ensureDirs() {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.mkdir(THUMBS_DIR, { recursive: true });
}

function prop(props: Record<string, any>, name: string) {
  if (name in props) return props[name];
  const alt = name[0].toUpperCase() + name.slice(1);
  return props[alt];
}

async function downloadImage(url: string, outPath: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image download failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(outPath, buf);
}

function extFromUrl(url: string) {
  try {
    const u = new URL(url);
    const m = u.pathname.match(/\.(png|jpg|jpeg|webp|gif|svg)$/i);
    return m ? m[0] : ".jpg";
  } catch {
    return ".jpg";
  }
}

function toFrontmatter(meta: Record<string, any>) {
  const yaml = Object.entries(meta)
    .map(([k, v]) => {
      if (Array.isArray(v))
        return `${k}: [${v
          .map((x) => `"${String(x).replace(/"/g, '\\"')}"`)
          .join(", ")}]`;
      if (typeof v === "string") return `${k}: "${v.replace(/"/g, '\\"')}"`;
      if (v == null) return `${k}:`;
      return `${k}: ${v}`;
    })
    .join("\n");
  return `---\n${yaml}\n---\n`;
}

async function main() {
  await ensureDirs();

  // (1) 전체 조회(필터 없음) + 최신순
  const all: any[] = [];
  let cursor: string | undefined;
  do {
    const resp = await notion.databases.query({
      database_id: DB_ID,
      sorts: [{ property: "date", direction: "descending" }],
      start_cursor: cursor,
    } as any);
    all.push(...resp.results);
    cursor = resp.has_more ? (resp.next_cursor as string) : undefined;
  } while (cursor);

  // (2) status === public (Status/Select 모두 지원, 대소문자 무시)
  const pages = all.filter((p) => {
    const s = prop(p.properties, "status");
    const name: string | undefined = s?.status?.name ?? s?.select?.name;
    return (name ?? "").toLowerCase() === "public";
  });

  console.log(`Fetched ${all.length} rows, filtered public: ${pages.length}`);

  for (const p of pages) {
    const props = p.properties;

    const title = prop(props, "title")?.title?.[0]?.plain_text ?? "Untitled";
    const slugProp = prop(props, "slug")?.rich_text?.[0]?.plain_text ?? "";
    const statusName: string =
      prop(props, "status")?.status?.name ??
      prop(props, "status")?.select?.name ??
      "public";
    const type = prop(props, "type")?.select?.name ?? "post";
    const category = prop(props, "category")?.select?.name ?? "";
    const tags = (prop(props, "tags")?.multi_select ?? []).map(
      (t: any) => t.name
    );
    const summary = prop(props, "summary")?.rich_text?.[0]?.plain_text ?? "";
    const date =
      prop(props, "date")?.date?.start ?? p.created_time?.slice(0, 10);

    const slug =
      (slugProp && slugify(slugProp)) ||
      (title && slugify(title)) ||
      p.id.replace(/-/g, "");

    // 썸네일: thumbnail 속성 → page cover
    let thumbnailUrl: string | null = null;
    const thumbProp = prop(props, "thumbnail");
    if (thumbProp?.files?.[0]?.file?.url)
      thumbnailUrl = thumbProp.files[0].file.url;
    else if (thumbProp?.files?.[0]?.external?.url)
      thumbnailUrl = thumbProp.files[0].external.url;
    else if (p.cover?.file?.url) thumbnailUrl = p.cover.file.url;
    else if (p.cover?.external?.url) thumbnailUrl = p.cover.external?.url;

    let thumbnailPath = "";
    if (thumbnailUrl) {
      const ext = extFromUrl(thumbnailUrl);
      const outPath = path.join(THUMBS_DIR, `${slug}${ext}`);
      try {
        await downloadImage(thumbnailUrl, outPath);
        thumbnailPath = `/thumbnails/${slug}${ext}`;
      } catch (e) {
        console.warn(
          `Thumbnail download failed for ${slug}: ${(e as Error).message}`
        );
      }
    }

    // 본문 → Markdown
    const mdBlocks = await n2m.pageToMarkdown(p.id);
    const mdString = n2m.toMarkdownString(mdBlocks).parent ?? "";

    // Frontmatter
    const fm = toFrontmatter({
      title,
      slug,
      status: (statusName ?? "").toLowerCase(),
      type,
      category,
      tags,
      summary,
      thumbnail: thumbnailPath,
      date,
    });

    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    const nextContent = `${fm}\n${mdString}\n`;

    // 변경 감지 후 쓰기
    let shouldWrite = true;
    try {
      const old = await fs.readFile(filePath);
      const oldHash = crypto.createHash("sha256").update(old).digest("hex");
      const newHash = crypto
        .createHash("sha256")
        .update(nextContent)
        .digest("hex");
      if (oldHash === newHash) shouldWrite = false;
    } catch {}
    if (shouldWrite) {
      await fs.writeFile(filePath, nextContent, "utf8");
      console.log(`Wrote content/posts/${slug}.md`);
    } else {
      console.log(`No changes: ${slug}.md`);
    }
  }
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
