import { SOCIAL_LINKS } from "@/constants";
import {
  SVGLogoFacebook,
  SVGLogoInstagram,
  SVGLogoTwitter
} from "../Svg/Svg.component";
import { socialLinkVariants } from "./SocialLinks.variants";

interface SocialLinksProps {
  white?: boolean;
}

export default function SocialLinks({
  white = false
}: SocialLinksProps) {
  return (
    <ul className="flex flex-row flex-nowrap items-center justify-center gap-x-2 p-0">
      <li>
        <a target="_blank" href={SOCIAL_LINKS.FACEBOOK} aria-label="Facebook" className={socialLinkVariants({ white })}>
          <SVGLogoFacebook size={18} />
        </a>
      </li>
      <li>
        <a target="_blank" href={SOCIAL_LINKS.INSTAGRAM} aria-label="Twitter" className={socialLinkVariants({ white })}>
          <SVGLogoTwitter size={16} />
        </a>
      </li>
      <li>
        <a target="_blank" href={SOCIAL_LINKS.INSTAGRAM} aria-label="Instagram" className={socialLinkVariants({ white })}>
          <SVGLogoInstagram size={24} />
        </a>
      </li>
    </ul>
  );
}
