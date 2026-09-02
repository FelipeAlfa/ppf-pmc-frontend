import localFont from "next/font/local";

export const liberationSans = localFont({
  variable: "--font-liberation-sans",
  src: [
    {
      path: "./assets/fonts/LiberationSans.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/LiberationSans.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/LiberationSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./assets/fonts/LiberationSans-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ]
});

export const helveticaNeue = localFont({
  variable: "--font-helvetica-neue",
  src: [
    {
      path: "./assets/fonts/HelveticaNeue-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./assets/fonts/HelveticaNeue-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./assets/fonts/HelveticaNeue-Roman.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/HelveticaNeue-Roman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/HelveticaNeue-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./assets/fonts/HelveticaNeue-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./assets/fonts/HelveticaNeue-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./assets/fonts/HelveticaNeue-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ]
});
