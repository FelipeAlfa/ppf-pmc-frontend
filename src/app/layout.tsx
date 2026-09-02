import type { Metadata } from "next";
import { helveticaNeue, liberationSans } from "@/fonts";
import { config as faConfig } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { AppProvider } from "@/context/AppContext";
import { appRegions, RegionsProvider } from "@/context/RegionContext";
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
      <RegionsProvider regions={appRegions}>
        <html
          lang="en"
          className={`${liberationSans.variable} ${helveticaNeue.variable}`}
          >
            <head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
            </head>
          <body>
            {children}
          </body>
        </html>
      </RegionsProvider>
    </AppProvider>
  );
}
