import Image from "next/image";
import { getAllSlugs, getPostMeta, getPostHtml } from "@/lib/posts";

export const dynamic = "error";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  return { title: meta.title, description: meta.summary ?? "" };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  const html = await getPostHtml(slug);

  return (
    <article className="prose prose-gray max-w-none">
      <div className="not-prose flex items-center gap-2 text-xs text-gray-700 mb-2">
        <span className="meta-chip">{meta.type}</span>
        {meta.category ? (
          <span className="meta-chip">{meta.category}</span>
        ) : null}
        <span>{meta.date}</span>
      </div>

      <h1 className="mb-2">{meta.title}</h1>

      {meta.thumbnail ? (
        <div className="relative w-full mb-3" style={{ aspectRatio: "16 / 9" }}>
          <Image
            src={meta.thumbnail}
            alt=""
            fill
            sizes="100vw"
            className="rounded-xl object-cover"
            priority
          />
        </div>
      ) : null}

      {meta.summary ? (
        <p>
          <em>{meta.summary}</em>
        </p>
      ) : null}

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
