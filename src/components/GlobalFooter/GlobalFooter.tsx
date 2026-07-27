import { FOOTER_LINKS } from "@/constants";
import Container from "../Container/Container";
import SocialLinks from "../SocialLinks/SocialLinks";

export default function GlobalFooter() {
  return (
    <footer className="block bg-brand-darkgray font-helvetica-neue">
      <Container>
        <div className="grid gap-8 grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-3 lg:py-12 xl:py-20">
          <div className="md:col-span-2 lg:col-span-1">
            <div className="text-center md:text-left">
              <h2 className="mb-1 text-2xl font-light text-background">Patrick McMullan</h2>
              <p className="text-sm leading-4.5 font-normal text-background">
                <strong className="font-bold">Patrick McMullan Company</strong> photographs a diverse range of events each week, some of which are PMc exclusives, and distributes images worldwide.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center md:items-start">
            <a
              className="block w-full max-w-60 cursor-pointer rounded-xs border border-white/50 bg-transparent px-4 py-5 text-center text-sm font-medium text-white uppercase transition-colors duration-100 ease-linear hover:bg-white/10 md:mx-0 md:py-3 lg:mx-auto"
              href="/book">
              Book PMC
            </a>
            <div className="block w-full text-center text-white md:text-left lg:text-center">
              <p className="text-xs xl:text-sm leading-4.5">
                <a href="mailto:info@patrickmcmullan.com">info@patrickmcmullan.com</a>
              </p>
              <p className="text-xs xl:text-sm leading-4.5">
                <a href="tel:1-646-638-2000">+1 646.638.2000</a>
              </p>
              <p className="text-xs xl:text-sm leading-4.5">
                Fax: 646.638.2223
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-between">
            <SocialLinks white />
            <div className="block text-center text-white/60">
              <p className="text-xs xl:text-sm leading-4.5">© Patrick McMullan Company 2026</p>
              <p className="text-xs xl:text-sm leading-4.5"><a href="http://pastpresentfuture.com" target="_blank">Site by PASTPRESENTFUTURE</a></p>
            </div>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/30 py-2">
        <nav>
          <ul className="m-0 flex list-none flex-row flex-nowrap items-center justify-center p-2">
            { FOOTER_LINKS.map(({ label, path }) => (
              <li key={label} className="block p-2 md:px-4 lg:px-8 xl:py-4">
                <a href={path} className="inline text-xs text-white/60 uppercase xl:text-sm">
                  {label}
                </a>
              </li>
            )) }
          </ul>
        </nav>
      </div>
    </footer>
  );
}
