/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { components } from "@/components/portable-text";
import { urlForImage } from "@/sanity/image";
import { client } from "@/sanity/client";

const POSTS_PER_PAGE = 6;

const QUERY = `{
  "tips": *[_type == "tip" && defined(slug.current)]|order(publishedAt desc),
  "intro": *[_type == "blockdocument" && tag == "tips-intro"][0]{
    html,
    content
  },
  "total": count(*[_type == "tip" && defined(slug.current)])
}`;

interface TipsData {
  tips: any[];
  intro?: {
    html?: {
      code: string;
    };
    content?: any[];
  };
  total: number;
}

export default function IndexPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<TipsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { tips, intro, total } = await client.fetch<TipsData>(QUERY);
      setData({ tips, intro, total });
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Error loading data.</p>;
  }

  const { tips, intro, total } = data;
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);
  const offset = (page - 1) * POSTS_PER_PAGE;
  const currentTips = tips.slice(offset, offset + POSTS_PER_PAGE);

  return (
    <main className="container mx-auto min-h-screen max-w-5xl p-8">
      <h1 className="text-4xl font-bold mb-8">Tips</h1>

      {intro && (
        <div className="prose dark:prose-invert mb-12">
          {intro.content ? (
            <PortableText value={intro.content} components={components} />
          ) : intro.html?.code ? (
            <div dangerouslySetInnerHTML={{ __html: intro.html.code }} />
          ) : null}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-10">
        {currentTips.map((tip) => (
          <div key={tip._id} className="flex flex-col h-full">
            <Link href={`/tips/${tip.slug.current}`} className="no-underline cursor-pointer group">
              <div className="aspect-video relative overflow-hidden rounded-xl">
                <Image
                  src={urlForImage(tip.image)?.url() || "/placeholder.png"}
                  alt={tip.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h2 className="text-xl font-semibold text-foreground mt-4 group-hover:text-accent transition-colors">
                {tip.title}
              </h2>
              <p className="text-muted-foreground">
                {new Date(tip.publishedAt).toLocaleDateString()}
              </p>
            </Link>
          </div>
        ))}
        {currentTips.length === 0 && (
          <p className="text-muted-foreground col-span-2">No tips found :&#40;</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className={`px-3 py-2 rounded cursor-pointer ${page <= 1 ? "pointer-events-none opacity-50" : ""}`}
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-3 py-2 rounded cursor-pointer ${
                pageNum === page ? "bg-accent text-black" : ""
              }`}
            >
              {pageNum}
            </button>
          ))}
          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            className={`px-3 py-2 rounded cursor-pointer ${
              page >= totalPages ? "pointer-events-none opacity-50" : ""
            }`}
          >
            →
          </button>
        </div>
      )}
    </main>
  );
}