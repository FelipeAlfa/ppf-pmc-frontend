"use client";

import { useState, type ReactNode } from "react";
import Button from "@/components/ui/Button/Button";

const visibleParagraphs: ReactNode[] = [
  "Patrick McMullan is an American photographer, columnist, television personality, publisher, art collector, philanthropist, businessman, documentarian and survivor. A New Yorker his whole life, born in Greenpoint, Brooklyn and raised in Huntington, Long Island. Educated at New York University, McMullan majored in business marketing and \"minored in Studio 54\" as he jokingly says.",
  <>
    {"Patrick McMullan has become a top photographer with a full service photography agency in Manhattan, with a photo studio located at 321 West 14th Street. On the website, "}
    <a className="text-brand-blue underline" href="http://www.PatrickMcMullan.com">
      www.PatrickMcMullan.com
    </a>
    {", viewers can get a glimpse into some of the most exclusive events in New York City, Los Angeles and South Florida."}
  </>,
  "Ultimately what makes the Patrick McMullan Company unique is what it contains on a historical level. Not only does his ever-increasing archive contain present day celebrities, people, and places but McMullan's extensive archive (spanning over 40 years) is believed to be, \"one of the largest photo archives of famous, living people in existence.\" Patrick McMullan's archive is a visual Who's Who that is an invaluable resource to the media and the individual.",
  "The premiere nightlife photographer in New York City since working at the club magazine Details in the 1980's, McMullan's work has become infinitely pervasive in both daily life and pop culture. His work appears regularly in New York Magazine's \"Party Lines\" column, newspaper amNew York's column AM/PMc, and all his monthly photo pages in Architectural Digest, Art & Auction, Gotham, and Hamptons, AVENUE, Quest, amongst others.",
  "McMullan's PMc Publishing Company, has six published books: Glamour Girls, Kiss Kiss, Intents, so8os: A Photographic Diary of a Decade, Men's Show, and Secrets of the Riviera. And is currently working on Klub Kidz and Patrick McMullan's: Blondes.",
];

const hiddenParagraphs: ReactNode[] = [
  "In addition to his photographs and publications, Patrick McMullan has exhibited his work in renowned galleries, museums and cultural institutions all over the world.",
  "With a career spanning over four decades, Patrick McMullan is one of the world's most celebrated party, fashion, and society photographers. He holds many philanthropic issues close to his heart. As a cancer survivor himself (in 1981), he's given much of his time to raise awareness, funding, and press for organizations such as the National Hemophilia Foundation, the Fire Department of New York Foundation (official calendar), and Art Walk to benefit The Coalition for the Homeless.",
  "Ultimately McMullan has impacted pop culture and New York City nightlife in ways never imagined. He has a very extensive archive collection which highlights all he has seen, lived through and photographed - and that it did, in fact, happen! And for that the world (and especially New York City) will be forever grateful.",
  "\"If you don't know Patrick McMullan, you ought to get out more!\" Andy Warhol, 1986",
  "\"Patrick McMullan performs a most valuable service - he goes out so you don't have to.\" Fran Lebowitz, 2003",
  "so8os: A Photographic Diary of a Decade",
  "\"By now a socialite would be any young woman who has appeared in three or more party pictures taken by Patrick McMullan for any of a dozen or so fat party-picture magazines.\" Tom Wolfe, August 21, 2006",
  "\"What if 9/11 Never Happened,\" New York Magazine",
  "\"...once you throw your hat into the ring, society is a perilous game, whether you're trying to break into the Astor 400 or the McMullan 4,000. Just when you thought you had arrived, there's always another code to crack or level to reach.\" Bob Morris, July 15, 2007",
  "\"I Am Chopped Liver,\" The Age of Dissonance, The New York Times",
];

export default function AboutBiography() {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = expanded
    ? [...visibleParagraphs, ...hiddenParagraphs]
    : visibleParagraphs;

  return (
    <div className="mt-6 space-y-4 text-sm leading-7 md:text-base">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          {paragraph}
        </p>
      ))}
      {!expanded && (
        <div className="flex justify-center pt-2">
          <Button
            type="button"
            variant="primary"
            onClick={() => setExpanded(true)}>
            Show more
          </Button>
        </div>
      )}
    </div>
  );
}
