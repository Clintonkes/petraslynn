import { photoSrcSet, photoUrl } from "@/config/images";

interface PhotoProps {
  src: string;
  sizes: string;
  alt: string;
  className?: string;
  /** The page's top photo: fetched first, at high priority. */
  priority?: boolean;
}

/** A Pexels photo offered at several widths, so each screen downloads only what it needs. */
export default function Photo({ src, sizes, alt, className, priority = false }: PhotoProps) {
  return (
    <img
      src={photoUrl(src, 1440)}
      srcSet={photoSrcSet(src)}
      sizes={sizes}
      alt={alt}
      className={className}
      decoding="async"
      // Photos further down wait until the top photo is in; Layout then
      // fetches them straight away, so they are ready before anyone scrolls.
      loading={priority ? "eager" : "lazy"}
      // React 18 has no fetchPriority prop yet; lowercase passes through as-is.
      {...{ fetchpriority: priority ? "high" : "auto" }}
    />
  );
}
