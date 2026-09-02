import Button from "@/components/ui/Button/Button";
import Container from "@/components/layout/Container/Container";
import PageContentText from "@/components/layout/PageContentText/PageContentText";
import PageHero from "@/components/layout/PageHero/PageHero";
import { dummyGetServices } from "@/lib/dummy-api/requests";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Services - Patrick McMullan",
  description: "Event photography, portraits, weddings, video, corporate, and social media services from Patrick McMullan Company.",
};

export default async function ServicesPage() {
  const services = await dummyGetServices();

  return (
    <>
      <PageHero
        title="Services"
        imageSrc="/images/services-slide.jpg"
        imageAlt="Patrick McMullan Company event photography services" />
      <Container verticalSpacing="large">
        <PageContentText center>
          <p>
            Patrick McMullan Company photographers ensure your event captivates long after the final hour.
          </p>
          <p>
            With a powerful media distribution list, stylistic photographs, and social media offerings, your event lives on.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              variant="primary"
              behavior="link"
              href="/book">
              Book a Photographer
            </Button>
          </div>
        </PageContentText>
      </Container>
      <Container verticalSpacing="large">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-14 my-12 md:grid-cols-2">
          {services.map((service) => (
            <li key={service.title}>
              <article className="group mx-auto w-full max-w-xl">
                <h2 className="mb-3 text-center text-lg font-light uppercase tracking-wider text-foreground/50 xl:text-2xl">
                  {service.title}
                </h2>
                <div className="relative aspect-4/3 overflow-hidden rounded-[5px] bg-[#eeeeee]">
                  <Image
                    className="object-cover transition-opacity duration-150 ease-linear group-hover:opacity-80"
                    src={service.imageSrc}
                    alt={service.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
                <p className="mt-2 text-xs leading-5 text-foreground/50">
                  {service.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
