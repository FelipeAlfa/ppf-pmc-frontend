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
    <section className="relative flex min-h-[18rem] items-center justify-center overflow-hidden bg-foreground text-white md:min-h-[24rem]">
      <Image
        className="object-cover"
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-wider md:text-5xl">
          {title}
        </h1>
        {children && (
          <div className="mx-auto mt-6 max-w-2xl text-base leading-7 md:text-lg">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
