import Container from "@/components/layout/Container/Container";
import GridView from "@/components/layout/GridView/GridView";
import PageHero from "@/components/layout/PageHero/PageHero";
import { publishingDummyData } from "@/lib/dummy-api/lists";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PMC Publishing - Patrick McMullan",
  description: "Books and publishing selections from the Patrick McMullan Company archive.",
};

export default function PublishingPage() {
  const publishingItems = publishingDummyData();

  return (
    <>
      <PageHero
        title="PMC Publishing"
        imageSrc="/images/publishing-slide.jpg"
        imageAlt="Patrick McMullan Company publishing catalog" />
      <Container verticalSpacing>
        <GridView
          items={publishingItems}
          renderItem={(product) => (
            <article>
              <div className="relative aspect-[3/4] overflow-hidden bg-[#eeeeee]">
                <Image
                  className="object-cover"
                  src={product.imageSrc}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
              </div>
              <h2 className="mt-4 text-sm font-bold uppercase tracking-wider">
                {product.name}
              </h2>
              <p className="mt-2 text-sm leading-6">
                {product.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold">
                  ${(product.price / 100).toFixed(2)}
                </span>
                <button
                  className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-xs border border-brand-blue bg-brand-blue px-4 text-xs font-bold uppercase tracking-wider text-white transition-colors duration-100 ease-linear hover:bg-foreground"
                  type="button">
                  Add to Cart
                </button>
              </div>
            </article>
          )} />
      </Container>
    </>
  );
}
