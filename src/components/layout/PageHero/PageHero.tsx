import Image from "next/image";

interface PageHeroProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  children?: React.ReactNode;
}

export default function PageHero({
  title,
  imageSrc,
  imageAlt,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-foreground text-white">
      <Image
        className="absolute inset-0 object-cover"
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw" />
      <div className="relative z-10 flex min-h-72 flex-col items-end justify-between gap-8 text-right md:min-h-96">
        <div className="mt-12.5 flex items-center rounded-l-xs bg-black/60 py-3 pl-5 pr-7.5 backdrop-blur-sm md:pl-25">
          <h1 className="flex items-center font-helvetica-neue-system text-2xl font-light uppercase leading-none tracking-[5px] text-white md:text-[36px]">
            {title}
          </h1>
        </div>
        {children && (
          <div className="mb-8 max-w-2xl pr-7.5 font-helvetica-neue-system text-sm leading-5 text-white">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
