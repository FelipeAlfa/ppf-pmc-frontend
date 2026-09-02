import Container from "@/components/layout/Container/Container";
import PageContentText from "@/components/layout/PageContentText/PageContentText";
import PageHero from "@/components/layout/PageHero/PageHero";
import PhotoCarousel from "@/components/layout/PhotoCarousel/PhotoCarousel";
import { dummyGetArchiveCarousel } from "@/lib/dummy-api/requests";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive - Patrick McMullan",
  description: "Explore the Patrick McMullan Company photo archive, a large topical collection of iconic images from the 70s through today.",
};

export default async function ArchivePage() {
  const archiveItems = await dummyGetArchiveCarousel(20);

  return (
    <>
      <PageHero
        title="Archive"
        imageSrc="/images/archive-slide.jpg"
        imageAlt="Patrick McMullan Company photo archive" />
      <Container verticalSpacing="large">
        <PageContentText center>
          <p>
            The PMC photo collection and archive is one of the largest topical photo archives of famous and living people in the world.
          </p>
          <p>
            It is an undiscovered library of iconic images from the 70s until today.
          </p>
        </PageContentText>
      </Container>
      <PhotoCarousel
        images={archiveItems.map((item) => ({
          src: item.src,
          alt: item.name,
          name: item.name,
        }))} />
      <Container verticalSpacing="large">
        <PageContentText center>
          <p>
            Interested in PMC Archive images? Contact our Research Department at{" "}
            <a className="text-brand-blue underline" href="mailto:research@patrickmcmullan.com">
              research@patrickmcmullan.com
            </a>
          </p>
        </PageContentText>
      </Container>
    </>
  );
}
