import Button from "@/components/ui/Button/Button";
import Container from "@/components/layout/Container/Container";
import PageHero from "@/components/layout/PageHero/PageHero";
import { dummyGetPublishing } from "@/lib/dummy-api/requests";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Publishing - Patrick McMullan",
  description: "Books and publishing selections from the Patrick McMullan Company archive.",
};

export default async function PublishingPage() {
  const publishingItems = await dummyGetPublishing(8);

  return (
    <>
      <PageHero
        title="PMC Publishing"
        imageSrc="/images/publishing-slide.jpg"
        imageAlt="Patrick McMullan Company publishing catalog" />
      <Container verticalSpacing="large">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {publishingItems.map((product) => (
            <li key={product.id}>
              <article className="mx-auto flex h-full max-w-sm flex-col items-center text-center">
                <Link
                  href={`/publishing/${product.id}`}
                  className="relative block aspect-square w-full max-w-45 overflow-hidden rounded-xs">
                  <Image
                    className="rounded-xs object-contain transition-opacity duration-150 ease-linear hover:opacity-80"
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                </Link>
                <div className="grow">
                  <h2 className="mt-2.5 mb-1 text-sm font-medium uppercase">
                    {product.name}
                  </h2>
                  <p className="text-xs leading-5">
                    {product.excerpt}
                  </p>
                </div>
                <div className="mt-3">
                  <span className="mb-1.5 block text-[15px] font-medium text-brand-blue">
                    ${(product.price / 100).toFixed(2)}
                  </span>
                  <Button
                    variant="primary"
                    type="button">
                    Add to Cart
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
