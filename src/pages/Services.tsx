import { Link } from "react-router-dom";
import {
  Scissors, Sparkles, Droplets, Leaf, Trees, Shovel,
  Check, ArrowRight, Phone, ChevronDown,
} from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { site, services } from "@/config/site";
import { pageImages, SIZES } from "@/config/images";
import Photo from "@/components/Photo";

const { hero: heroImage } = pageImages.services;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scissors, Sparkles, Leaf, Droplets, Trees, Shovel,
};

export default function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div>
      <PageHeader
        title="Our Services"
        subtitle="Complete lawn care and landscape management designed for Colorado's Front Range."
        breadcrumb="Services"
        image={heroImage}
      />

      {/* Accordion-style service list with image thumbnails */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-600 font-bold text-sm uppercase tracking-widest">
              Complete Lawn Care
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-pine-900 mt-2 mb-4">
              Everything Your Property Needs
            </h2>
            <p className="text-pine-600 max-w-2xl mx-auto">
              Click any service below to see the details. All services are
              available as single visits or recurring plans.
            </p>
          </div>

          <div className="space-y-4">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Leaf;
              const isOpen = openIndex === index;
              return (
                <div
                  key={service.slug}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-gold-300 shadow-lg"
                      : "border-pine-100 hover:border-pine-200"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center gap-4 p-5 text-left"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "gold-gradient"
                          : "bg-pine-50"
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 ${
                          isOpen ? "text-white" : "text-pine-700"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-pine-900">
                        {service.title}
                      </h3>
                      <p className="text-pine-500 text-sm mt-0.5 truncate">
                        {service.short}
                      </p>
                    </div>
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-gold-100 text-gold-600 rotate-180"
                          : "bg-pine-50 text-pine-400"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-6">
                        <div className="border-t border-pine-100 pt-5">
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            <div className="md:col-span-2">
                              <div className="rounded-xl overflow-hidden h-44">
                                <Photo
                                  src={service.image}
                                  sizes={SIZES.serviceThumb}
                                  alt={service.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <div className="md:col-span-3">
                              <p className="text-pine-600 text-sm leading-relaxed mb-4">
                                {service.description}
                              </p>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                {service.features.map((feature) => (
                                  <li
                                    key={feature}
                                    className="flex items-start gap-2"
                                  >
                                    <div className="w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <Check className="w-3.5 h-3.5 text-gold-600" />
                                    </div>
                                    <span className="text-pine-700 text-sm">
                                      {feature}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              <Link
                                to="/quote"
                                className="inline-flex items-center gap-2 text-gold-600 font-semibold text-sm hover:gap-3 transition-all"
                              >
                                Request This Service
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process — horizontal timeline on navy */}
      <section className="py-24 pine-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold-400 font-bold text-sm uppercase tracking-widest">
              Getting Started
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mt-2 mb-4">
              How to Get Service
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Reach Out", text: "Call us or fill out the quote form with your property details." },
              { step: "02", title: "Free Estimate", text: "We assess your yard and provide a clear, upfront price." },
              { step: "03", title: "Pick a Plan", text: "Choose a service plan and schedule that works for you." },
              { step: "04", title: "We Get to Work", text: "Our crew takes care of everything. You enjoy the results." },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-pine-800/60 rounded-2xl p-6 border border-pine-700"
              >
                <div className="text-5xl font-semibold gold-text mb-3">
                  {item.step}
                </div>
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

      {/* CTA */}
      <section className="py-16 gold-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 mb-8">
            Get your free quote today and see the Petraslynn difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/quote"
              className="bg-pine-900 hover:bg-pine-800 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              Get a Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`tel:${site.phoneRaw}`}
              className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Phone className="w-5 h-5" /> {site.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
