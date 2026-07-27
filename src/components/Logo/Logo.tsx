import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png"
import { logoVariants } from "./Logo.variants";

interface LogoProps {
  presentation?: boolean;
  small?: boolean
}

export default function Logo(
  {
    presentation = false,
    small = false
  }: LogoProps
) {
  const homeLinkClassName = logoVariants({ small });

  const image = (
    <Image
      className="block h-full w-auto p-0"
      src={logo}
      alt="Patrick McMullan Company" />
  );

  return (
    presentation ? (
      <span className={homeLinkClassName}>
        {image}
      </span>
    ) : (
      <Link className={homeLinkClassName} href="/">
        {image}
      </Link>
    )
  );
};
