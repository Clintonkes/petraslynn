import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Photo from "./Photo";
import { SIZES } from "@/config/images";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumb: string;
  image: string;
}

export default function PageHeader({ title, subtitle, breadcrumb, image }: PageHeaderProps) {
  return (
    // pt-20 clears the fixed navbar (h-20).
    <section className="relative pt-20 overflow-hidden">
      <div className="absolute inset-0">
        <Photo priority src={image} sizes={SIZES.full} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-pine-950/95 via-pine-900/85 to-pine-900/60" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <nav className="flex items-center gap-2 text-sm text-pine-200 mb-5" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-gold-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-gold-400" />
          <span className="text-gold-400 font-medium">{breadcrumb}</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 max-w-3xl">
          {title}
        </h1>
        <p className="text-lg text-pine-100 max-w-2xl leading-relaxed">{subtitle}</p>
        <div className="w-16 h-1 gold-gradient rounded-full mt-8" />
      </div>
    </section>
  );
}
