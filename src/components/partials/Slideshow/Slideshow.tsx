"use client";

import type { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container/Container";
import DynamicCSS from "@/components/ui/DynamicCSS/DynamicCSS";
import { getMainBulletIndexes } from "./Slideshow.utils";
import { SVGChevronBlockLeft, SVGChevronBlockRight } from "@/components/ui/Svg/Svg.component";
import Link from 'next/link';
import {
  navigationButtonCounterVariants,
  paginationBulletVariants,
} from "./Slideshow.variants";

const movePositions = (slideElement: HTMLElement, positionIndexToMove?: number) => {
  if (positionIndexToMove === undefined) {
    slideElement.style.transform = "translate3d(0, 0, 0)";
    slideElement.style.zIndex = "1";
  }
  else {
    slideElement.style.transform = `translate3d(${positionIndexToMove * 100}%, 0, 0)`;
    slideElement.style.zIndex = `2`;
  }
};

interface SlideshowProps {
  slides?: SlideProps[];
}

interface SlideProps {
  imageSrc: string;
  title: string;
  subTitle: string;
  link: string;
}

interface PaginationProps {
  slides: SlideProps[];
  currentIndex: number;
  onClickBullet: (index: number) => void;
}

interface NavigationProps {
  currentIndex: number;
  slidesLength: number;
  onClickPrev: () => void;
  onClickNext: () => void;
}

const paginationListClassName = "slideshow-pagination-list";
const paginationItemClassName = "slideshow-pagination-item";

export default function Slideshow({
  slides
}: SlideshowProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentAndNearSlidesRef = useRef<[HTMLElement, HTMLElement] | null>(null);

  const restoreCurrentAndNearSlides = () => {
    if (currentAndNearSlidesRef.current) {
      const [currentSlideNode] = currentAndNearSlidesRef.current;
      movePositions(currentSlideNode);
      currentAndNearSlidesRef.current = null;
    }
  };

  const doRestrictedAction = (callback: (emblaAPI: EmblaCarouselType) => void) => {
    if (!emblaApi) return;
    restoreCurrentAndNearSlides();
    callback(emblaApi);
  };

  const slideDirectTo = (
    index: number
  ) => {
      doRestrictedAction((emblaApi) => {
        const nearIndex = index > currentIndex ? index - 1 : index + 1;
        const slides = emblaApi.slideNodes();
        const currentSlideNode = slides[currentIndex];
        const nearSlideNode = slides[nearIndex];

        if (currentSlideNode && nearSlideNode) {
          movePositions(currentSlideNode, nearIndex - currentIndex);
          currentAndNearSlidesRef.current = [currentSlideNode, nearSlideNode];
        }

        emblaApi.scrollTo(nearIndex, true);
        emblaApi.scrollTo(index);
      });
  };

  const slideTo = (index: number) => {
    if (Math.abs(index - currentIndex) > 1) {
      slideDirectTo(index);
      return;
    }

    doRestrictedAction((emblaApi) => {
      emblaApi.scrollTo(index);
    });
  };

  const slideToNext = () => {
    doRestrictedAction((emblaApi) => {
      emblaApi.scrollNext();
    });
  };

  const slideToPrev = () => {
    doRestrictedAction((emblaApi) => {
      emblaApi.scrollPrev();
    });
  };

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("init", () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    });

    emblaApi.on("select", () => {
      setCurrentIndex(emblaApi.selectedScrollSnap()); 
    });

    emblaApi.on("settle", () => {
      restoreCurrentAndNearSlides();
    });
  }, [emblaApi]);

  return slides && slides.length && (
    <div className="relative block overflow-hidden">
      <div className="group relative block overflow-hidden" ref={emblaRef}>
        <div className="relative flex [touch-action:pan-y_pinch-zoom]">
          {slides.map(({ title, subTitle, imageSrc, link }, index) => (
            <div key={index} className="relative z-[1] min-w-full flex-[0_0_100%]">
              <Slide
                imageSrc={imageSrc}
                title={title}
                subTitle={subTitle}
                link={link}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[1] block h-auto w-full -translate-y-1/2">
        <Navigation
          currentIndex={currentIndex}
          slidesLength={slides.length}
          onClickPrev={slideToPrev}
          onClickNext={slideToNext} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] block h-auto w-full p-4 sm:p-8">
        <Pagination
          slides={slides}
          currentIndex={currentIndex}
          onClickBullet={slideTo} />
      </div>
    </div>
  );
}

function Slide({
  imageSrc,
  title,
  subTitle,
  link,
}: SlideProps) {
  return (
    <div className="relative block h-[380px] w-full bg-[#EEEEEE] supports-[height:calc(100svh_-_80px)]:h-[calc(100svh_-_80px)] supports-[height:calc(100svh_-_80px)]:min-h-[300px] sm:h-[670px] sm:supports-[height:calc(100svh_-_80px)]:h-[calc(100svh_-_80px)] sm:supports-[height:calc(100svh_-_80px)]:max-h-[670px] sm:supports-[height:calc(100svh_-_80px)]:min-h-[380px] 2xl:h-[700px] 2xl:supports-[height:calc(100svh_-_80px)]:h-[calc(100svh_-_80px)] 2xl:supports-[height:calc(100svh_-_80px)]:max-h-[800px] 2xl:supports-[height:calc(100svh_-_80px)]:min-h-[600px]">
      <div className="absolute inset-0 z-0 block h-full w-full overflow-hidden">
        <Image
          className="absolute inset-0 block h-full w-full object-cover"
          src={imageSrc}
          alt={title}
          width={1920}
          height={1080}/>
      </div>
      <div className="relative inset-0 z-[1] flex h-full w-full flex-col items-start justify-end overflow-hidden [text-shadow:2px_0_12px_#0009]">
        <div className="relative w-full p-8 transition-colors duration-300 ease-linear">
          <div className="pointer-events-none absolute inset-0 -z-[1] block h-full w-full bg-[linear-gradient(0deg,rgba(47,49,51,.5)_0%,rgba(0,0,0,0)_100%)] opacity-0 transition-opacity duration-300 ease-linear group-hover:opacity-100" />
          <Container>
            <h2 className="text-center font-helvetica-neue text-[22px] font-medium tracking-[2px] text-white uppercase sm:text-left">
              <Link href={link}>{title}</Link>
            </h2>
            <p className="mt-2 text-center font-helvetica-neue text-sm font-normal tracking-[2px] text-white normal-case opacity-70 sm:text-left">
              {subTitle}
            </p>
          </Container>
        </div>
      </div>
    </div>
  );
}

function Navigation({
  currentIndex,
  slidesLength,
  onClickPrev,
  onClickNext,
}: NavigationProps) {
  return (
    <div className="pointer-events-none relative flex w-full flex-row flex-nowrap items-center justify-between overflow-hidden p-0 sm:p-8">
      <button
        type="button"
        onClick={onClickPrev}
        className="group pointer-events-auto relative cursor-pointer rounded-[35%] border-0 bg-transparent p-4 text-white opacity-30 transition-opacity duration-300 ease-linear hover:opacity-60 focus-visible:opacity-60">
        <SVGChevronBlockLeft size={50} />
        <span
          className={navigationButtonCounterVariants({ side: "prev" })}>
          {currentIndex + 1} / {slidesLength}
        </span>
      </button>
      <button
        type="button"
        onClick={onClickNext}
        className="group pointer-events-auto relative cursor-pointer rounded-[35%] border-0 bg-transparent p-4 text-white opacity-30 transition-opacity duration-300 ease-linear hover:opacity-60 focus-visible:opacity-60">
        <SVGChevronBlockRight size={50} />
        <span
          className={navigationButtonCounterVariants({ side: "next" })}>
          {currentIndex + 1} / {slidesLength}
        </span>
      </button>
    </div>
  );
}

function Pagination({
  slides,
  currentIndex,
  onClickBullet
}: PaginationProps) {
  const mainBullets = 5;
  const bulletSize = 18;
  const bulletSeparation = 4;

  const { indexes: mainBulletIndexes, fix } = getMainBulletIndexes(
    mainBullets, slides.length, currentIndex
  );
  const bulletItemFixedWidth = bulletSize + (bulletSeparation * 2);
  const middle = slides.length % 2 === 0 ? slides.length / 2 : (slides.length / 2) - 0.5;
  const traslateX = (bulletItemFixedWidth * middle) - (bulletItemFixedWidth * currentIndex) - (fix * bulletItemFixedWidth);
  const isEven = mainBullets % 2 === 0;

  return (
    <div className="pointer-events-none relative flex w-full flex-row flex-nowrap items-center justify-center overflow-hidden">
      <DynamicCSS globalPrefix="." css={{
        [paginationListClassName]: {
          transform: `translateX(${traslateX}px)`,
          paddingRight: isEven ? bulletItemFixedWidth + 'px' : '0'
        },
        [paginationItemClassName]: {
          width: bulletSize + 'px',
          height: bulletSize + 'px',
          marginLeft: bulletSeparation + 'px',
          marginRight: bulletSeparation + 'px',
        }
      }} />
      <ul className={`${paginationListClassName} flex flex-row flex-nowrap items-center justify-center transition-transform duration-300 ease-linear`}>
        {slides.map((slide, index) => (
          <li key={index} className={`${paginationItemClassName} block shrink-0 grow-0 box-content overflow-visible`}>
            <button
              type="button"
              className={paginationBulletVariants({
                state: currentIndex === index
                  ? "active"
                  : mainBulletIndexes.includes(index)
                    ? "main"
                    : "inactive"
              })}
              onClick={() => {
                onClickBullet(index);
              }}
              aria-label={`Go to slide ${index}: ${slide.title}`}/>
          </li>
        ))}
      </ul>
    </div>
  );
}
