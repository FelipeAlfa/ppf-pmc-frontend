import { CSSProperties } from "react";
import { fromCamelToKebab } from "./string";

export const cssStyles = (
  styles: Record<string, CSSProperties>
) => {
  return Object.entries(styles)
    .map(([selector, css]) => `${selector}{${Object.entries(css)
      .map(([property, value]) => `${fromCamelToKebab(property)}:${value};`)
      .join('')}}`)
    .join('');
};
