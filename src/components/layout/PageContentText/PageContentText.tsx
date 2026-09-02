import { pageContentTextVariants } from "./PageContentText.variants";

interface PageContentTextProps {
  center?: boolean;
  children?: React.ReactNode;
}

export default function PageContentText({
  center = false,
  children,
}: PageContentTextProps) {
  return (
    <div className={pageContentTextVariants({ center })}>
      {children}
    </div>
  );
}
