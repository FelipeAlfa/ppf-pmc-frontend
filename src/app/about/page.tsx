import Container from "@/components/Container/Container";
import GridView from "@/components/GridView/GridView";
import PageHero from "@/components/PageHero/PageHero";
import { photographersDummyData } from "@/dev/dummyData";
import Image from "next/image";

export default function AboutPage() {
  const [mainPhotographer, ...photographers] = photographersDummyData;

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
      <Container verticalSpacing>
        <section className="grid gap-8 bg-[#eeeeee] p-4 md:grid-cols-[minmax(0,24rem)_1fr] md:p-8">
          <div className="relative aspect-[4/5] overflow-hidden bg-white">
            <Image
              className="object-cover"
              src={mainPhotographer.imageSrc}
              alt={mainPhotographer.name}
              fill
              sizes="(min-width: 768px) 24rem, 100vw" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-blue">
              {mainPhotographer.role}
            </p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-wider">
              {mainPhotographer.name}
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 md:text-base">
              <p>
                Patrick McMullan Company has chronicled New York culture, nightlife, fashion, art, and philanthropy for decades.
              </p>
              <p>
                This modern rebuild keeps the editorial spirit of the original site while giving us a cleaner component system for search, galleries, publishing, and events.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-12">
          <h2 className="mb-6 text-center text-2xl font-bold uppercase tracking-wider">
            <span className="text-brand-blue">PMC</span> Photographers
          </h2>
          <GridView
            items={photographers}
            renderItem={(photographer) => (
              <article className="text-center">
                <div className="relative mx-auto aspect-square max-w-60 overflow-hidden rounded-full bg-[#eeeeee]">
                  <Image
                    className="object-cover"
                    src={photographer.imageSrc}
                    alt={photographer.name}
                    fill
                    sizes="15rem" />
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-wider">
                  {photographer.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-brand-blue">
                  {photographer.role}
                </p>
              </article>
            )} />
        </section>
      </Container>
    </>
  );
}
