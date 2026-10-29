import { Link } from "react-router-dom";
import {
  Scissors, Sparkles, Droplets, Leaf, Trees, Shovel,
  ArrowRight, Phone, CheckCircle2, ShieldCheck, Clock, Truck,
  Star,
} from "lucide-react";
import { site, services, testimonials } from "@/config/site";
import StarRating from "@/components/StarRating";
import { pageImages, SIZES } from "@/config/images";
import Photo from "@/components/Photo";

const { hero: heroImage, about: aboutImage, cta: ctaImage } = pageImages.home;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scissors, Sparkles, Leaf, Droplets, Trees, Shovel,
};

export default function Home() {
  return (
    <div>
      {/* Hero — split-screen: dark panel left, image right */}
      <section className="relative min-h-screen flex pt-20 overflow-hidden">
        <div className="absolute inset-0 lg:flex">
          <div className="hidden lg:block w-[55%] pine-gradient" />
          <div className="hidden lg:block w-[45%] relative">
            <Photo priority src={heroImage} sizes={SIZES.homeHero} alt="Lawn care professional mowing a suburban lawn" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-pine-950/20" />
          </div>
        </div>

        {/* Mobile background */}
        <div className="absolute inset-0 lg:hidden">
          <Photo priority src={heroImage} sizes={SIZES.homeHero} alt="Lawn care" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-pine-950/85" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center py-20 lg:py-0">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-400/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-300 text-sm font-medium">
                Aurora&apos;s Trusted Lawn Care Professionals
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
              A Lush, Healthy Lawn
              <br />
              <span className="gold-text">Without the Work</span>
            </h1>
            <p className="text-lg text-pine-100 mb-8 leading-relaxed max-w-xl">
              Petraslynn LLC delivers professional lawn care and landscape
              management across Aurora and the Denver metro area. Colorado
              expertise, reliable scheduling, and results you can see.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/quote"
                className="gold-gradient hover:opacity-90 text-white font-semibold px-8 py-4 rounded-lg text-base transition-all duration-200 shadow-xl shadow-gold-500/20 flex items-center gap-2"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${site.phoneRaw}`}
                className="border border-pine-600 hover:border-gold-400 text-white font-semibold px-8 py-4 rounded-lg text-base transition-all duration-200 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {site.phone}
              </a>
            </div>

            {/* Inline trust indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10">
              {[
                { icon: ShieldCheck, text: "Licensed & Insured" },
                { icon: Clock, text: "On Time, Every Time" },
                { icon: Truck, text: "Free Estimates" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-sm text-pine-200"
                >
                  <item.icon className="w-5 h-5 text-gold-400" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip — navy bar with copper numbers */}
      <section className="bg-pine-800 border-y border-pine-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "500+", label: "Properties Served" },
              { value: "8+", label: "Years in Business" },
              { value: "4.9", label: "Average Rating" },
              { value: "8", label: "Areas Covered" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-semibold text-gold-400 mb-1">
                  {stat.value}
                </p>
                <p className="text-pine-200 text-sm font-medium uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services — icon-first cards, no images, copper accent border-top */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold-600 font-bold text-sm uppercase tracking-widest">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-pine-900 mt-2 mb-4">
              Complete Lawn & Landscape Care
            </h2>
            <p className="text-pine-600 max-w-2xl mx-auto">
              From weekly mowing to complete landscape transformations, we handle
              every aspect of keeping your property looking its best in
              Colorado&apos;s unique climate.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Leaf;
              return (
                <Link
                  key={service.slug}
                  to="/services"
                  className="group bg-white rounded-xl border border-pine-100 hover:border-gold-300 hover:shadow-xl card-hover overflow-hidden"
                >
                  <div className="h-1.5 gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="p-7">
                    <div className="w-14 h-14 rounded-xl bg-pine-50 group-hover:bg-pine-900 flex items-center justify-center mb-5 transition-all duration-300">
                      <Icon className="w-7 h-7 text-pine-700 group-hover:text-gold-400 transition-colors duration-300" />
                    </div>
                    <h3 className="font-bold text-lg text-pine-900 mb-2 group-hover:text-gold-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-pine-500 text-sm leading-relaxed mb-4">
                      {service.short}
                    </p>
                    <span className="inline-flex items-center gap-1 text-gold-600 font-semibold text-sm group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About preview — image left, text right with checklist */}
      <section className="py-24 bg-pine-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Photo
                  src={aboutImage}
                  sizes={SIZES.half}
                  alt="Petraslynn lawn care professional at work"
                  className="w-full h-[440px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-pine-100 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                    <Star className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-pine-900">4.9</p>
                    <p className="text-xs text-pine-500 font-medium">
                      200+ Reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-gold-600 font-bold text-sm uppercase tracking-widest">
                About Petraslynn
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-pine-900 mt-2 mb-5">
                Colorado&apos;s Lawn Care Specialists
              </h2>
              <p className="text-pine-600 leading-relaxed mb-6">
                Petraslynn LLC is a locally owned and operated lawn care company
                serving Aurora and the greater Denver metro area. We understand
                Colorado&apos;s high altitude climate, clay soils, and water
                constraints, and we know how to keep your lawn thriving through
                it all.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Locally owned in Aurora",
                  "Same crew every visit",
                  "Colorado expertise",
                  "Free estimates, no obligation",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <span className="text-pine-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-pine-900 hover:bg-pine-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
              >
                Learn More About Us <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process — horizontal numbered cards on navy bg */}
      <section className="py-24 pine-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold-400 font-bold text-sm uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mt-2 mb-4">
              Four Steps to a Better Lawn
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Reach Out", text: "Call us or fill out the quote form. Tell us about your property and goals." },
              { num: "02", title: "Free Estimate", text: "We assess your yard and provide a clear, upfront price with no obligation." },
              { num: "03", title: "Schedule Service", text: "Pick a plan and schedule that works for you. We handle the rest." },
              { num: "04", title: "Enjoy Your Yard", text: "Our crew takes care of everything. You relax and enjoy the results." },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-pine-800/60 rounded-2xl p-6 border border-pine-700 hover:border-gold-500/50 transition-colors duration-300"
              >
                <p className="text-5xl font-semibold gold-text mb-4">
                  {item.num}
                </p>
                <h3 className="font-bold text-white text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-pine-300 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — featured large + grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold-600 font-bold text-sm uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-pine-900 mt-2 mb-4">
              What Our Clients Say
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <StarRating rating={5} size="md" />
              <span className="text-pine-500 font-medium text-sm">
                4.9 average from 200+ reviews
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-pine-50 rounded-xl p-6 border border-pine-100 hover:shadow-lg transition-shadow duration-300"
              >
                <StarRating rating={t.rating} size="md" />
                <p className="text-pine-700 mt-4 mb-5 leading-relaxed text-sm">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-pine-100">
                  <div className="w-11 h-11 rounded-full gold-gradient flex items-center justify-center font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-pine-900 text-sm">
                      {t.name}
                    </p>
                    <p className="text-pine-400 text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — full-width image with navy overlay */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Photo
            src={ctaImage}
            sizes={SIZES.full}
            alt="Beautifully maintained property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-pine-950/85" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready for a Lawn You Will Love?
          </h2>
          <p className="text-pine-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Request your free estimate today, with no obligation. Our team will create a
            customized care plan that fits your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/quote"
              className="gold-gradient hover:opacity-90 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 shadow-xl shadow-gold-500/20 flex items-center gap-2"
            >
              Request Your Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`tel:${site.phoneRaw}`}
              className="border border-pine-500 hover:border-gold-400 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 flex items-center gap-2"
            >
              <Phone className="w-5 h-5" /> {site.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
