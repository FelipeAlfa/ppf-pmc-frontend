"use client";

import { INTERNAL_LINKS } from "@/constants";
import { useEffect, useState } from "react";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import Logo from "../Logo/Logo";
import { SVGCart } from "@/components/ui/Svg/Svg.component";
import Link from "next/link";
import Overlay from "@/components/ui/Overlay/Overlay";
import { usePathname } from "next/navigation";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useRegions } from "@/context/RegionContext";
import SocialLinks from "../SocialLinks/SocialLinks";
import {
  featuresVariants,
  navLinkVariants,
} from "./GlobalHeader.variants";

const breakpointsForMobileMode = ["XS", "SM", "MD", "LG"];
const regionsToToggle = ["main", "modal", "globalFooter"];

export default function GlobalHeader() {
  const [mobileMenuIsActive, setMobileMenuIsActive] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState(false);
  const pathName = usePathname();
  const {get: getRegions} = useRegions();

  useBreakpoint((currentBreakpoint, previousBreakpoint) => {
    if (mobileMenuIsActive && previousBreakpoint && !breakpointsForMobileMode.includes(currentBreakpoint)) {
      console.log("closing mobile menu");
      setMobileMenuIsActive(false);
    }

    setIsMobileMode(breakpointsForMobileMode.includes(currentBreakpoint));
  });

  useEffect(() => {
    const regions = getRegions(...regionsToToggle);

    const setARIAHidden = (hidden: boolean) => {
      for (const region of regions) {
        if (hidden) {
          region.domElement.setAttribute("aria-hidden", "true");
        }
        else {
          region.domElement.removeAttribute("aria-hidden");
        }
      }
    };

    if (isMobileMode && mobileMenuIsActive) {
      setARIAHidden(true);
    }
    else {
      setARIAHidden(false);
    }

    return () => setARIAHidden(false);
  }, [getRegions, isMobileMode, mobileMenuIsActive]);

  const onClickNavLink = () => setMobileMenuIsActive(false);

  const navLink = (
    link: string,
    name: string
  ) => (
    <Link
      target="_self"
      href={link}
      onClick={onClickNavLink}
      className={navLinkVariants({ active: pathName === link })}>
      {name}
    </Link>
  );

  const navLinkCart = () => (
    <Link
      target="_self"
      href="/cart"
      onClick={onClickNavLink}
      className={navLinkVariants({ variant: "cart" })}>
      <SVGCart size={26} />
      <span className="ml-2 opacity-80">(0)</span>
    </Link>
  );

  const navLinkBook = () => (
    <Link
      target="_self"
      href="/book"
      onClick={onClickNavLink}
      className={navLinkVariants({ variant: "book" })}>
      Book PMC
    </Link>
  );

  const mobileOptionsARIAProps = isMobileMode
    ? { "aria-hidden": mobileMenuIsActive || undefined }
    : {};

  const featuresARIAProps = isMobileMode
    ? { "aria-hidden": !mobileMenuIsActive || undefined }
    : {};

  return (
    <div className="block h-20 w-full border-b border-[#e8e8e8] bg-white p-4">
      <div className="block h-full w-full">
        <div className="relative grid h-full w-full grid-cols-[auto_1fr] gap-4 xl:hidden" {...mobileOptionsARIAProps}>
          <div className="h-full">
            <div className="flex h-full flex-col justify-center">
              <HamburgerButton
                isActive={mobileMenuIsActive}
                onClick={() => setMobileMenuIsActive(!mobileMenuIsActive)} />
            </div>
          </div>
          <div className="h-full">
            <div className="flex h-full flex-col justify-center">
              <Logo />
            </div>
          </div>
        </div>
        <div className="block xl:hidden">
          <Overlay
            active={mobileMenuIsActive}
            onBackgroundClick={() => setMobileMenuIsActive(false)} />
        </div>
        <div className={featuresVariants({ active: mobileMenuIsActive })} {...featuresARIAProps}>
          <div className="mb-8 min-h-4 min-w-4 overflow-hidden xl:mb-0">
            <div className="flex h-full flex-col justify-center">
              <div className="ml-4 flex flex-row flex-nowrap items-center justify-between xl:mx-4 xl:block">
                <div className="mt-1.75 block xl:mt-0 xl:inline">
                  <span className="hidden xl:inline">
                    <Logo />
                  </span>
                  <span className="inline h-12 xl:hidden">
                    <Logo presentation small />
                  </span>
                </div>
                <div className="xl:hidden">
                  <HamburgerButton
                    isActive={mobileMenuIsActive}
                    onClick={() => setMobileMenuIsActive(!mobileMenuIsActive)} />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8 min-h-4 min-w-4 overflow-hidden xl:mb-0">
            <div className="flex h-full flex-col justify-center">
              <div className="xl:flex xl:h-full xl:flex-row xl:flex-nowrap xl:items-center xl:justify-start">
                <nav aria-label="Main navigation">
                  <ul className="flex flex-col flex-nowrap items-start justify-start gap-4 xl:flex-row xl:items-center">
                    <li className="w-full xl:hidden">
                      {navLink("/", "Home")}
                    </li>
                    {INTERNAL_LINKS.map((link, index) => (
                      <li
                        className="w-full xl:relative xl:w-auto xl:after:absolute xl:after:top-1/2 xl:after:left-full xl:after:ml-2 xl:after:block xl:after:h-4 xl:after:w-px xl:after:-translate-y-1/2 xl:after:bg-[#EEEEEE] xl:after:content-['']"
                        key={index}>
                        {navLink(link.path, link.label)}
                      </li>
                    ))}
                  </ul>
                </nav>
                <nav aria-label="Social links">
                  <div className="mt-8 flex flex-row flex-nowrap items-center justify-start border-b border-[#EEEEEE] pb-4 xl:mt-0 xl:ml-4 xl:border-b-0 xl:p-0">
                    <SocialLinks />
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div className="mb-8 min-h-4 min-w-4 overflow-hidden xl:mb-0 2xl:flex 2xl:flex-row 2xl:justify-end">
            <div className="flex h-full flex-col justify-center">
              <nav aria-label="Account and shopping">
                <ul className="flex flex-col flex-nowrap items-start justify-start gap-4 xl:flex-row xl:items-center">
                  <li className="w-full xl:w-auto">
                    {navLink("/account", "Account")}
                  </li>
                  <li className="w-full xl:w-auto">
                    {navLinkCart()}
                  </li>
                  <li className="w-full xl:w-auto">
                    {navLinkBook()}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
