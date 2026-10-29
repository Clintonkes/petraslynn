import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X, ZoomIn } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { galleryImages } from "@/config/site";
import { pageImages, SIZES } from "@/config/images";
import Photo from "@/components/Photo";

const { hero: heroImage } = pageImages.gallery;

const categories = ["All", "Mowing", "Trimming", "Cleanup", "Irrigation", "Design", "Full Service"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const nextImage = () =>
    setLightbox((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null,
    );
  const prevImage = () =>
    setLightbox((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : null,
    );

  return (
    <div>
      <PageHeader
        title="Our Work"
        subtitle="See the quality of our lawn care and landscape management in action."
        breadcrumb="Gallery"
        image={heroImage}
      />

      <section className="py-24 bg-pine-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "gold-gradient text-white shadow-md"
                    : "bg-white text-pine-600 hover:bg-pine-100 border border-pine-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
            {filtered.map((img, index) => (
              <div
                key={`${img.url}-${index}`}
                className="group relative rounded-xl overflow-hidden shadow-sm cursor-pointer break-inside-avoid"
                onClick={() => openLightbox(index)}
              >
                <Photo
                  src={img.url}
                  sizes={SIZES.galleryGrid}
                  alt={img.caption}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div>
                    <span className="inline-block gold-gradient text-white text-xs font-semibold px-2.5 py-1 rounded-md mb-2">
                      {img.category}
                    </span>
                    <p className="text-white text-sm font-medium">
                      {img.caption}
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-pine-950/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white p-2 hover:text-gold-400 transition-colors"
            aria-label="Close"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-4 md:left-8 text-white p-2 hover:text-gold-400 transition-colors text-3xl"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Previous"
          >
            &#8592;
          </button>
          <button
            className="absolute right-4 md:right-8 text-white p-2 hover:text-gold-400 transition-colors text-3xl"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Next"
          >
            &#8594;
          </button>
          <div className="max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Photo
              src={filtered[lightbox].url}
              sizes={SIZES.lightbox}
              alt={filtered[lightbox].caption}
              className="max-w-full max-h-[80vh] rounded-lg shadow-2xl mx-auto"
            />
            <p className="text-white text-center mt-4 text-sm font-medium">
              {filtered[lightbox].caption}
            </p>
          </div>
        </div>
      )}

      {/* CTA — navy */}
      <section className="py-16 pine-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Want Results Like These?
          </h2>
          <p className="text-pine-200 mb-8">
            Let us bring the same quality care to your property. Get a free quote
            today.
          </p>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 gold-gradient hover:opacity-90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg"
          >
            Get Your Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
