import { galleryImages, services } from "./site";

/**
 * Every photo on the site. Shared by the pages and by the preloader in
 * vite.config.ts, so a page's top photo starts downloading before React loads.
 */
export const pageImages = {
  home: {
    hero:
      "https://images.pexels.com/photos/28180214/pexels-photo-28180214.jpeg?auto=compress&cs=tinysrgb&w=1200",
    about:
      "https://images.pexels.com/photos/4079768/pexels-photo-4079768.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta:
      "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  about: {
    hero:
      "https://images.pexels.com/photos/2604622/pexels-photo-2604622.jpeg?auto=compress&cs=tinysrgb&w=1600",
    team:
      "https://images.pexels.com/photos/5163429/pexels-photo-5163429.jpeg?auto=compress&cs=tinysrgb&w=1200",
    area:
      "https://images.pexels.com/photos/29014467/pexels-photo-29014467.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  services: {
    hero:
      "https://images.pexels.com/photos/38936349/pexels-photo-38936349.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  gallery: {
    hero:
      "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  quote: {
    hero:
      "https://images.pexels.com/photos/37554739/pexels-photo-37554739.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  contact: {
    hero:
      "https://images.pexels.com/photos/38936338/pexels-photo-38936338.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  faq: {
    hero:
      "https://images.pexels.com/photos/37720375/pexels-photo-37720375.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
} as const;

/** Widths offered to the browser; it downloads the smallest one that is sharp
 * on the visitor's screen (Pexels serves AVIF to browsers that accept it). */
const WIDTHS = [480, 768, 1080, 1200, 1440, 1920];

/** How wide each kind of photo is rendered, for the browser's size choice. */
export const SIZES = {
  full: "100vw",
  half: "(min-width: 1024px) 50vw, 100vw",
  homeHero: "(min-width: 1024px) 45vw, 100vw",
  galleryGrid: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  lightbox: "(min-width: 896px) 896px, 100vw",
  serviceThumb: "(min-width: 768px) 400px, 100vw",
} as const;

export function photoUrl(url: string, width: number): string {
  const u = new URL(url);
  u.searchParams.delete("h");
  u.searchParams.set("auto", "compress");
  u.searchParams.set("cs", "tinysrgb");
  u.searchParams.set("w", String(width));
  return u.toString();
}

export function photoSrcSet(url: string): string {
  return WIDTHS.map((w) => `${photoUrl(url, w)} ${w}w`).join(", ");
}

export interface PhotoRequest {
  url: string;
  sizes: string;
}

/** The photo visible as soon as each route opens, preloaded from index.html. */
export const entryImages: Record<string, PhotoRequest> = {
  "/": { url: pageImages.home.hero, sizes: SIZES.homeHero },
  "/about": { url: pageImages.about.hero, sizes: SIZES.full },
  "/services": { url: pageImages.services.hero, sizes: SIZES.full },
  "/gallery": { url: pageImages.gallery.hero, sizes: SIZES.full },
  "/quote": { url: pageImages.quote.hero, sizes: SIZES.full },
  "/contact": { url: pageImages.contact.hero, sizes: SIZES.full },
  "/faq": { url: pageImages.faq.hero, sizes: SIZES.full },
};

/**
 * Every photo with the sizes it is rendered at, page heroes first, for
 * warming the cache. The sizes must match the rendered <img>, or the browser
 * picks a different width and the warmed copy goes unused.
 */
export const allImages: PhotoRequest[] = [
  ...Object.values(entryImages),
  { url: pageImages.home.about, sizes: SIZES.half },
  { url: pageImages.home.cta, sizes: SIZES.full },
  { url: pageImages.about.team, sizes: SIZES.half },
  { url: pageImages.about.area, sizes: SIZES.half },
  ...services.map((s) => ({ url: s.image, sizes: SIZES.serviceThumb })),
  ...galleryImages.map((g) => ({ url: g.url, sizes: SIZES.galleryGrid })),
];
