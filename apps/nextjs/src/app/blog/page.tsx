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
  "posts": *[_type == "post" && defined(slug.current)]|order(publishedAt desc),
  "intro": *[_type == "blockdocument" && tag == "blog-intro"][0]{
    html,
    content
  },
  "total": count(*[_type == "post" && defined(slug.current)])
}`;

interface BlogData {
  posts: any[];
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
  const [data, setData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { posts, intro, total } = await client.fetch<BlogData>(QUERY);
      setData({ posts, intro, total });
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

  const { posts, intro, total } = data;
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);
  const offset = (page - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(offset, offset + POSTS_PER_PAGE);

  return (
    <main className="container mx-auto min-h-screen max-w-5xl p-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

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
        {currentPosts.map((post) => (
          <div key={post._id} className="flex flex-col h-full">
            <Link href={`/blog/${post.slug.current}`} className="no-underline cursor-pointer group">
              <div className="aspect-video relative overflow-hidden rounded-xl">
                <Image
                  src={urlForImage(post.image)?.url() || "/placeholder.png"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h2 className="text-xl font-semibold text-foreground mt-4 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </Link>
          </div>
        ))}
        {currentPosts.length === 0 && (
          <p className="text-muted-foreground col-span-2">No posts found :&#40;</p>
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