import AboutBiography from "@/components/domains/about/AboutBiography";
import Container from "@/components/layout/Container/Container";
import PageHero from "@/components/layout/PageHero/PageHero";
import { photographersDummyData } from "@/lib/dummy-api/lists";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About PMC - Patrick McMullan",
  description: "Learn about Patrick McMullan Company and the photographers chronicling culture, nightlife, fashion, art, and philanthropy.",
};

export default function AboutPage() {
  const [mainPhotographer] = photographersDummyData();

  return (
    <>
      <PageHero
        title="About PMC"
        imageSrc="/images/about-slide.jpg"
        imageAlt="Patrick McMullan Company studio">
        <address className="not-italic">
          Patrick McMullan Company<br />
          321 West 14th Street #B<br />
          New York, NY 10014
        </address>
      </PageHero>
      <Container verticalSpacing="large">
        <section className="overflow-hidden">
          <div className="mb-6 w-full overflow-hidden border-4 border-brand-blue bg-white md:float-left md:mr-8 md:mb-4 md:w-96">
            <Image
              className="h-auto w-full"
              src={mainPhotographer.imageSrc}
              alt={mainPhotographer.name}
              width={1000}
              height={1500}
              sizes="(min-width: 768px) 24rem, 100vw" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-blue">
            {mainPhotographer.role}
          </p>
          <h2 className="mt-2 text-2xl font-bold uppercase tracking-wider">
            {mainPhotographer.name}
          </h2>
          <AboutBiography />
        </section>
      </Container>
    </>
  );
}
