import BaseLayout from "@/components/layout/BaseLayout/BaseLayout";
import Region from "@/components/layout/Region/Region";
import Sticky from "@/components/layout/Sticky/Sticky";
import GlobalFooter from "@/components/partials/GlobalFooter/GlobalFooter";
import GlobalHeader from "@/components/partials/GlobalHeader/GlobalHeader";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({
  children,
}: SiteLayoutProps) {
  return (
    <>
      <BaseLayout
        top={
          <Sticky name="globalHeader" hide z={100}>
            <Region region="globalHeader">
              <GlobalHeader />
            </Region>
          </Sticky>
        }
        middle={
          <main>
            <Region region="mainContent">
              {children}
            </Region>
          </main>
        }
        bottom={
          <Region region="globalFooter">
            <GlobalFooter />
          </Region>
        }
      />
      <Region region="mainModal" />
    </>
  );
}
