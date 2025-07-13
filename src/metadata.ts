import type { Metadata } from "next";
import type { Robots } from "next/dist/lib/metadata/types/metadata-types";
import { BASE_URL } from "#lib/Constants";

export const createMetadata = ({
  canonical,
  description,
  robots,
  title,
}: {
  canonical: string;
  description: string;
  robots: Robots;
  title: string;
}): Metadata => {
  return {
    alternates: {
      canonical,
    },
    applicationName: "Muzzle",
    authors: {
      name: "MuzzleStudio",
    },
    creator: "MuzzleStudio",
    description,
    keywords: [
      "Bot",
      "Discord Bot",
      "Discord",
      "MuzzleStudio",
      "Muzzlecord Bot",
      "Muzzlecord",
      "Muzzle Bot",
      "Muzzle",
      "Leveling",
      "Level"
    ],
    openGraph: {
      description,
      images: {
        url: `${BASE_URL}/assets/Muzzle.webp`,
      },
      locale: "en_US",
      siteName: "Muzzle",
      title,
      type: "website",
      url: canonical,
    },
    robots,
    title,
    twitter: {
      card: "summary_large_image",
      creator: "@MuzzleStudio",
      description,
      images: {
        url: `${BASE_URL}/assets/Muzzle.webp`,
      },
      site: "@Muzzle",
      title,
    },
  };
};
