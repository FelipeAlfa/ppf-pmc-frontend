import Container from "@/components/Container/Container";
import GridView from "@/components/GridView/GridView";
import PageHero from "@/components/PageHero/PageHero";
import { archiveDummyData } from "@/dev/dummyData";
import Image from "next/image";

export default function ArchivePage() {
  return (
    <>
      <PageHero
        title="Archive"
        imageSrc="/images/archive-slide.jpg"
        imageAlt="Patrick McMullan Company photo archive" />
      <Container verticalSpacing>
        <div className="mx-auto max-w-4xl text-center text-base leading-7 md:text-lg">
          <p>
            The PMC photo collection and archive is one of the largest topical photo archives of famous and living people in the world.
          </p>
          <p className="mt-4">
            It is an undiscovered library of iconic images from the 70s until today.
          </p>
        </div>
        <div className="mt-12">
          <GridView
            items={archiveDummyData}
            renderItem={(item) => (
              <article>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#eeeeee]">
                  <Image
                    className="object-cover"
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                </div>
                <h2 className="mt-3 text-xs font-bold uppercase tracking-wider">
                  {item.title}
                </h2>
              </article>
            )} />
        </div>
        <p className="mt-12 text-center text-sm leading-6">
          Interested in PMC Archive images? Contact our Research Department at{" "}
          <a className="text-brand-blue underline" href="mailto:research@patrickmcmullan.com">
            research@patrickmcmullan.com
          </a>
        </p>
      </Container>
    </>
  );
}
