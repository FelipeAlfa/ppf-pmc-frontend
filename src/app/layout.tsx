import type { Metadata } from "next";
import { helveticaNeue, liberationSans } from "@/fonts";
import { config as faConfig } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import GlobalHeader from "@/components/partials/GlobalHeader/GlobalHeader";
import GlobalFooter from "@/components/partials/GlobalFooter/GlobalFooter";
import { AppProvider } from "@/context/AppContext";
import { classNames } from "@/utils";
import Region from "@/components/layout/Region/Region";
import { RegionsProvider } from "@/context/RegionContext";
import BaseLayout from "@/components/layout/BaseLayout/BaseLayout";
import Sticky from "@/components/layout/Sticky/Sticky";
import "@/styles/globals.css";

faConfig.autoAddCss = false

export const metadata: Metadata = {
  title: "Patrick McMullan",
  description: "Patrick McMullan Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <RegionsProvider>
        <html
          lang="en"
          className={classNames(
            liberationSans.variable,
            helveticaNeue.variable,
          )}
          >
            <head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
            </head>
          <body>
            <BaseLayout
              top={
                <Sticky name="globalHeader" hide>
                  <Region name="globalHeader">
                    <GlobalHeader />
                  </Region>
                </Sticky>
              }
              middle={
                <Region name="main">
                  <main>{children}</main>
                </Region>
              }
              bottom={
                <Region name="globalFooter">
                  <GlobalFooter />
                </Region>
              }
            />
          </body>
        </html>
      </RegionsProvider>
    </AppProvider>
  );
}
