import Container from "@/components/Container/Container";
import GridView from "@/components/GridView/GridView";
import PageHero from "@/components/PageHero/PageHero";
import { servicesDummyData } from "@/lib/dummy/dummyData";
import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services"
        imageSrc="/images/services-slide.jpg"
        imageAlt="Patrick McMullan Company event photography services">
        <p>
          Patrick McMullan Company photographers ensure your event captivates long after the final hour.
        </p>
      </PageHero>
      <Container verticalSpacing>
        <div className="mx-auto mb-10 max-w-3xl text-center text-base leading-7">
          <p>
            With a powerful media distribution list, stylistic photographs, and social media offerings, your event lives on.
          </p>
          <Link
            href="/book"
            className="mt-8 inline-flex min-h-10 items-center justify-center rounded-xs border border-brand-blue bg-brand-blue px-4 text-xs font-bold uppercase tracking-wider text-white transition-colors duration-100 ease-linear hover:bg-foreground">
            Book a Photographer
          </Link>
        </div>
        <GridView
          items={servicesDummyData}
          renderItem={(service) => (
            <article>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider">
                {service.title}
              </h2>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#eeeeee]">
                <Image
                  className="object-cover"
                  src={service.imageSrc}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
              </div>
              <p className="mt-4 text-sm leading-6">
                {service.description}
              </p>
            </article>
          )} />
      </Container>
    </>
  );
}
