import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const gobold = localFont({
  display: "swap",
  preload: true,
  variable: "--gobold",
  src: [
    {
      path: "./gobold/Gobold-Regular-BF63bf583841621.otf",
      weight: "400",
    },
    {
      path: "./gobold/Gobold-Regular-Italic-BF63bf583cabdf6.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./gobold/Gobold-Bold-BF63bf583a33e1b.otf",
      weight: "700",
    },
    {
      path: "./gobold/Gobold-Bold-Italic-BF63bf583deffc8.otf",
      weight: "700",
      style: "italic",
    },
  ],
});

export const gobold_hollow = localFont({
  display: "swap",
  preload: true,
  variable: "--gobold-hollow",
  src: [
    {
      path: "./gobold/Gobold-Hollow-BF63bf583e7255e.otf",
      weight: "400",
    },
    {
      path: "./gobold/Gobold-Hollow-Italic-BF63bf583e0531f.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./gobold/Gobold-Hollow-Bold-BF63bf583dc45be.otf",
      weight: "700",
    },
    {
      path: "./gobold/Gobold-Hollow-Bold-Italic-BF63bf583e1a351.otf",
      weight: "700",
      style: "italic",
    },
  ],
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
