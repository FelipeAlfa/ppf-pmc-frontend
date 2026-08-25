import { cssStyles } from "@/lib/css";
import { CSSProperties } from "react";

interface DynamicCSSProps {
  globalPrefix?: string;
  css: Record<string, CSSProperties>;
}

export default function DynamicCSS({
  globalPrefix,
  css
}: DynamicCSSProps) {
  let cssData = css;

  if (globalPrefix) {
    // add prefix to cssData keys only
    cssData = Object.entries(cssData)
      .reduce((acc, [key, value]) => {
        acc[`${globalPrefix}${key}`] = value;
        return acc;
      }, {} as Record<string, CSSProperties>);
  }

  return (
    <style>{cssStyles(cssData)}</style>
  );
}
