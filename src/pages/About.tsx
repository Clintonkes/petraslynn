import { Link } from "react-router-dom";
import {
  Heart, ShieldCheck, Sparkles, Users, ArrowRight, Phone, MapPin,
  CheckCircle2, Award, Truck, Clock, Leaf,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { site } from "@/config/site";
import { pageImages, SIZES } from "@/config/images";
import Photo from "@/components/Photo";

const { hero: heroImage, team: teamImage, area: areaImage } = pageImages.about;

const values = [
  { icon: Heart, title: "Local Roots", description: "We are part of the Aurora community. Every property we care for reflects our pride in our home and our state." },
  { icon: ShieldCheck, title: "Reliability", description: "We show up on schedule, every time. Consistent, dependable service you can count on year after year." },
  { icon: Sparkles, title: "Attention to Detail", description: "From clean mowing lines to spotless cleanup, we sweat the details so your property always looks its best." },
  { icon: Users, title: "Customer First", description: "We listen, communicate, and stand behind our work. Your satisfaction drives everything we do." },
];

const stats = [
  { value: "500+", label: "Properties Served" },
  { value: "8+", label: "Years in Business" },
  { value: "4.9", label: "Average Rating" },
  { value: "8", label: "Areas Served" },
];

export default function About() {
  return (
    <div>
      <PageHeader
        title="About Petraslynn"
        subtitle="Locally owned, community focused lawn care serving Aurora and the greater Denver metro area."
        breadcrumb="About"
        image={heroImage}
      />

      {/* Story — quote-style intro then text+image */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Leaf className="w-10 h-10 text-gold-500 mx-auto mb-4" />
            <p className="text-2xl md:text-3xl font-semibold text-pine-900 leading-snug text-balance">
              &ldquo;We started Petraslynn because Colorado homeowners deserve a
              lawn care company that actually shows up, does quality work, and
              understands this climate.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold-600 font-bold text-sm uppercase tracking-widest">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-pine-900 mt-2 mb-6">
                Built on Quality and Community Trust
              </h2>
              <div className="space-y-4 text-pine-600 leading-relaxed">
                <p>
                  Petraslynn LLC was founded in Aurora, Colorado with a simple
                  mission: provide lawn care that Front Range homeowners can
                  actually rely on. We saw too many neighbors frustrated by
                  inconsistent crews, missed appointments, and companies that
                  did not understand Colorado&apos;s high altitude growing
                  conditions.
                </p>
                <p>
                  We built our business one property at a time, earning trust
                  through consistent, exceptional service. From weekly mowing
                  to full landscape installations, we have grown our offerings
                  to meet the real needs of our community.
                </p>
                <p>
                  Today, we serve hundreds of properties across Aurora, Denver,
                  Centennial, and beyond. But we have never lost the personal
                  touch that earned us our reputation. When you call
                  Petraslynn, you are working with a team that genuinely cares
                  about your property.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Photo
                  src={teamImage}
                  sizes={SIZES.half}
                  alt="Petraslynn team at work"
                  className="w-full h-[450px] object-cover"
                />
              </div>
              <div className="absolute -top-5 -left-5 gold-gradient text-white rounded-xl px-6 py-4 shadow-xl hidden md:block">
                <p className="text-3xl font-semibold">8+ Years</p>
                <p className="text-sm font-medium">Serving Colorado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — copper gradient bar */}
      <section className="gold-gradient text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl font-semibold mb-1">
                  {stat.value}
                </p>
                <p className="text-white/80 text-sm font-medium uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values — 2x2 icon cards with copper accent */}
      <section className="py-24 bg-pine-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold-600 font-bold text-sm uppercase tracking-widest">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-pine-900 mt-2 mb-4">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-7 border border-pine-100 hover:shadow-lg transition-shadow duration-300 flex items-start gap-5"
              >
                <div className="w-14 h-14 rounded-xl bg-pine-900 flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-7 h-7 text-gold-400" />
                </div>
                <div>
                  <h3 className="font-bold text-pine-900 mb-2">{value.title}</h3>
                  <p className="text-pine-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us — horizontal feature row with navy bg */}
      <section className="py-24 pine-gradient">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold-400 font-bold text-sm uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mt-2 mb-4">
              The Petraslynn Difference
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Award, title: "Professional Results", text: "Experienced crew and professional equipment deliver a clean, polished look every visit." },
              { icon: Clock, title: "Dependable Scheduling", text: "We arrive on schedule and communicate clearly. No guessing when your service will happen." },
              { icon: Truck, title: "All Equipment Provided", text: "We bring everything needed to get the job done right. You do not lift a finger." },
              { icon: CheckCircle2, title: "Complete Cleanup", text: "We leave your property spotless. Clippings, leaves, and debris are always cleaned up." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-6 rounded-xl bg-pine-800/60 border border-pine-700"
              >
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-pine-300 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Photo
                src={areaImage}
                sizes={SIZES.half}
                alt="Colorado landscape"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <span className="text-gold-600 font-bold text-sm uppercase tracking-widest">
                Service Area
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-pine-900 mt-2 mb-5">
                Areas We Serve
              </h2>
              <p className="text-pine-600 mb-6 leading-relaxed">
                Proudly serving Aurora and the surrounding Denver metro
                communities. If you are nearby but not sure if we cover your
                neighborhood, just give us a call.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {site.serviceAreas.map((area) => (
                  <div
                    key={area}
                    className="flex items-center gap-2 text-pine-700 text-sm"
                  >
                    <MapPin className="w-4 h-4 text-gold-500" />
                    {area}
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 gold-gradient hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
              >
                Check Your Area <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — navy gradient */}
      <section className="py-16 pine-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Let&apos;s Transform Your Property
          </h2>
          <p className="text-pine-200 mb-8">
            Join hundreds of satisfied customers who trust Petraslynn with their
            lawn care needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/quote"
              className="gold-gradient hover:opacity-90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              Get a Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`tel:${site.phoneRaw}`}
              className="border border-pine-600 hover:border-gold-400 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Phone className="w-5 h-5" /> {site.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
