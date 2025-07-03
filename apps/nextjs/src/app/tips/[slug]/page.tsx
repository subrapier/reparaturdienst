import { type SanityDocument } from "next-sanity";
import { PortableText } from "@/components/portable-text";
import { client } from "@/sanity/client";
import Image from "next/image";
import { urlForImage } from "@/sanity/image";

const POST_QUERY = `*[_type == "tip" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

export default async function TipPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const tip = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  
  if (!tip) {
    return (
      <>
        <h1 className="text-4xl font-bold mb-8">Error 404</h1>
        <div className="flex items-start space-x-6">
          <div className="flex flex-col space-y-2">
            <p>Page not found</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {tip.image && (
        <Image
          src={urlForImage(tip.image)?.url() || "/placeholder.png"}
          alt={tip.title}
          className="aspect-video rounded-xl w-full my-8"
          width={640}
          height={640}
        />
      )}
      <h1 className="text-4xl font-bold">{tip.title}</h1>
      <p className="uppercase font-bold text-muted-foreground mb-8">
        Published: {new Date(tip.publishedAt).toLocaleDateString()}
      </p>
      {Array.isArray(tip.body) && <PortableText value={tip.body} />}
    </>
  );
}
