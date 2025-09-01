"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Post = {
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

export default function PostListClient({
  posts,
  types,
  categories,
  tags,
}: {
  posts: Post[];
  types: string[];
  categories: string[];
  tags: string[];
}) {
  const [q, setQ] = useState(""),
    [type, setType] = useState("all");
  const [category, setCategory] = useState("all"),
    [tag, setTag] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return posts.filter((p) => {
      if (type !== "all" && p.type !== type) return false;
      if (category !== "all" && (p.category || "") !== category) return false;
      if (tag !== "all" && !p.tags.includes(tag)) return false;
      if (!ql) return true;
      const hay = [
        p.title,
        p.summary || "",
        p.slug,
        p.category || "",
        ...(p.tags || []),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(ql);
    });
  }, [posts, q, type, category, tag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);
  const onFilter = (setter: (v: string) => void) => (v: string) => {
    setter(v);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="검색(제목/요약/태그)"
            className="w-full md:flex-1 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-800"
          />
          <div className="flex gap-2">
            <select
              className="rounded-lg border border-gray-300 px-2 py-2"
              value={type}
              onChange={(e) => onFilter(setType)(e.target.value)}
            >
              <option value="all">Type: All</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              className="rounded-lg border border-gray-300 px-2 py-2"
              value={category}
              onChange={(e) => onFilter(setCategory)(e.target.value)}
            >
              <option value="all">Category: All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              className="rounded-lg border border-gray-300 px-2 py-2"
              value={tag}
              onChange={(e) => onFilter(setTag)(e.target.value)}
            >
              <option value="all">Tag: All</option>
              {tags.map((tg) => (
                <option key={tg} value={tg}>
                  {tg}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-600">총 {filtered.length}개</p>
      </div>

      <ul className="grid gap-4">
        {current.map((p, idx) => (
          <li key={p.slug} className="card">
            {p.thumbnail ? (
              <div
                className="relative w-full mb-3"
                style={{ aspectRatio: "16 / 9" }}
              >
                <Image
                  src={p.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="rounded-xl object-cover"
                  priority={page === 1 && idx === 0}
                />
              </div>
            ) : null}

            <div className="flex items-center gap-2 text-gray-700 text-xs mb-1">
              <span className="meta-chip">{p.type}</span>
              {p.category ? (
                <span className="meta-chip">{p.category}</span>
              ) : null}
              <span>{p.date}</span>
            </div>

            <h2 className="text-xl font-semibold">
              <Link href={`/${p.slug}/`} className="underline">
                {p.title}
              </Link>
            </h2>

            {p.summary ? (
              <p className="mt-1 text-gray-700">{p.summary}</p>
            ) : null}

            {p.tags?.length ? (
              <div className="flex flex-wrap gap-1 mt-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs text-gray-600">
                    #{t}
                  </span>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            이전
          </button>
          <span className="text-sm">
            페이지 {page} / {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
