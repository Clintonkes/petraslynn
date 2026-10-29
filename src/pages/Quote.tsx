import { useState, FormEvent } from "react";
import {
  ArrowRight, ArrowLeft, CheckCircle2, Loader2, AlertCircle,
  Phone, Mail, User, Wrench, Calendar, ClipboardCheck, Check,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { site, services } from "@/config/site";
import { createBooking } from "@/lib/api";
import { pageImages } from "@/config/images";

const { hero: heroImage } = pageImages.quote;

const serviceOptions = [
  ...services.map((s) => s.title),
  "Multiple services",
  "Full maintenance plan",
  "Not sure yet",
];
const frequencyOptions = ["Single visit", "Weekly", "Every other week", "Monthly", "Not sure yet"];
const sizeOptions = [
  "Under 1/4 acre",
  "1/4 to 1/2 acre",
  "1/2 to 1 acre",
  "1 to 2 acres",
  "2+ acres",
  "Commercial property",
];

interface QuoteData {
  name: string;
  email: string;
  phone: string;
  address: string;
  service_type: string;
  property_size: string;
  frequency: string;
  preferred_date: string;
  message: string;
}

export default function Quote() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuoteData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    service_type: "",
    property_size: "",
    frequency: "",
    preferred_date: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [reference, setReference] = useState("");

  const update = (field: keyof QuoteData, value: string) =>
    setData({ ...data, [field]: value });

  const canProceed = () => {
    if (step === 1) return data.name && data.email && data.phone && data.address;
    if (step === 2) return data.service_type;
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Pressing Enter inside an earlier step submits the form; treat it as
    // "Continue" instead of sending a half-filled request.
    if (step < 3) {
      if (canProceed()) setStep(step + 1);
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const booking = await createBooking({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        service: data.service_type,
        lawn_size: data.property_size || undefined,
        frequency: data.frequency || undefined,
        preferred_date: data.preferred_date || undefined,
        notes: data.message || undefined,
      });
      setReference(booking.reference);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-pine-50 flex items-center justify-center px-4 pt-28 pb-16">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-10 text-center">
          <div className="w-20 h-20 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-gold-600" />
          </div>
          <h2 className="text-2xl font-semibold text-pine-900 mb-3">
            Quote Request Received!
          </h2>
          <p className="text-pine-600 mb-8 leading-relaxed">
            Thank you for reaching out to Petraslynn LLC. Our team will review
            your request and contact you within 24 hours to schedule your free
            property assessment.
          </p>
          {reference && (
            <p className="text-sm text-pine-500 mb-8">
              Your reference number is{" "}
              <span className="font-mono font-semibold text-pine-900">{reference}</span>.
              A confirmation has been sent to your email.
            </p>
          )}
          <div className="bg-pine-50 rounded-xl p-5 mb-8 text-left">
            <p className="text-sm text-pine-500 mb-2">Need to talk to us now?</p>
            <a
              href={`tel:${site.phoneRaw}`}
              className="flex items-center gap-2 text-gold-600 font-semibold"
            >
              <Phone className="w-5 h-5" /> {site.phone}
            </a>
          </div>
          <button
            onClick={() => {
              setStatus("idle");
              setStep(1);
              setData({
                name: "",
                email: "",
                phone: "",
                address: "",
                service_type: "",
                property_size: "",
                frequency: "",
                preferred_date: "",
                message: "",
              });
            }}
            className="bg-pine-900 hover:bg-pine-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, label: "Your Info", icon: User },
    { num: 2, label: "Service Details", icon: Wrench },
    { num: 3, label: "Review & Submit", icon: ClipboardCheck },
  ];

  return (
    <div>
      <PageHeader
        title="Get a Free Quote"
        subtitle="Answer a few questions and we'll prepare a tailored quote. No obligation."
        breadcrumb="Quote"
        image={heroImage}
      />

      <section className="py-20 bg-pine-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Horizontal progress bar */}
          <div className="flex items-center justify-between mb-10 max-w-2xl mx-auto">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all duration-300 ${
                      step >= s.num
                        ? "gold-gradient text-white shadow-lg shadow-gold-500/20"
                        : "bg-white text-pine-300 border border-pine-200"
                    }`}
                  >
                    {step > s.num ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <s.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      step >= s.num ? "text-gold-600" : "text-pine-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 rounded-full transition-all duration-300 ${
                      step > s.num ? "gold-gradient" : "bg-pine-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg border border-pine-100 p-8 md:p-10"
          >
            {status === "error" && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-700 font-medium text-sm">
                    Submission failed
                  </p>
                  <p className="text-red-600 text-sm">{errorMsg}</p>
                </div>
              </div>
            )}

            {/* Step 1 — Contact info */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-semibold text-pine-900 mb-1">
                    Let&apos;s start with you
                  </h2>
                  <p className="text-pine-500 text-sm mb-6">
                    We need your contact info to follow up with your quote.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-pine-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={data.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-pine-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm"
                    placeholder="John Smith"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-pine-700 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-pine-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-pine-700 mb-1.5">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={data.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-pine-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm"
                      placeholder="(303) 555 0100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-pine-700 mb-1.5">
                    Property Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={data.address}
                    onChange={(e) => update("address", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-pine-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm"
                    placeholder="748 Victor Street, Aurora, CO 80011"
                  />
                </div>
              </div>
            )}

            {/* Step 2 — Service details */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-semibold text-pine-900 mb-1">
                    Tell us about your needs
                  </h2>
                  <p className="text-pine-500 text-sm mb-6">
                    What kind of service are you looking for?
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-pine-700 mb-1.5">
                    Service Needed <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={data.service_type}
                    onChange={(e) => update("service_type", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-pine-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-pine-700 mb-1.5">
                      Property Size
                    </label>
                    <select
                      value={data.property_size}
                      onChange={(e) => update("property_size", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-pine-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm bg-white"
                    >
                      <option value="">Select size</option>
                      {sizeOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-pine-700 mb-1.5">
                      Frequency
                    </label>
                    <select
                      value={data.frequency}
                      onChange={(e) => update("frequency", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-pine-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm bg-white"
                    >
                      <option value="">Select frequency</option>
                      {frequencyOptions.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-pine-700 mb-1.5">
                    Preferred Start Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={data.preferred_date}
                    onChange={(e) => update("preferred_date", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-pine-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pine-700 mb-1.5">
                    Additional Details
                  </label>
                  <textarea
                    rows={3}
                    value={data.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-pine-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm resize-none"
                    placeholder="Any specific concerns, problem areas, or goals for your property..."
                  />
                </div>
              </div>
            )}

            {/* Step 3 — Review */}
            {step === 3 && (
              <div className="animate-fade-in">
                <div>
                  <h2 className="text-2xl font-semibold text-pine-900 mb-1">
                    Review your request
                  </h2>
                  <p className="text-pine-500 text-sm mb-6">
                    Please confirm your details before submitting.
                  </p>
                </div>
                <div className="bg-pine-50 rounded-xl p-6 space-y-4">
                  {[
                    { icon: User, label: "Name", value: data.name },
                    { icon: Mail, label: "Email", value: data.email },
                    { icon: Phone, label: "Phone", value: data.phone },
                    { icon: ClipboardCheck, label: "Address", value: data.address },
                    { icon: Wrench, label: "Service", value: data.service_type },
                    { icon: ClipboardCheck, label: "Property Size", value: data.property_size },
                    { icon: Calendar, label: "Frequency", value: data.frequency },
                    { icon: Calendar, label: "Preferred Date", value: data.preferred_date },
                    { icon: ClipboardCheck, label: "Notes", value: data.message },
                  ]
                    .filter((item) => item.value)
                    .map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start gap-3"
                      >
                        <item.icon className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-pine-400 uppercase tracking-wide">
                            {item.label}
                          </p>
                          <p className="text-pine-800 font-medium text-sm">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 text-pine-600 hover:text-pine-900 font-medium text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <span />
              )}
              {/* Distinct keys stop React reusing one <button> for both: if
                  "Continue" became type="submit" mid-click, the click that
                  opens the review step would also submit the form. */}
              {step < 3 ? (
                <button
                  key="continue"
                  type="button"
                  onClick={() => canProceed() && setStep(step + 1)}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 gold-gradient hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  key="submit"
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center gap-2 gold-gradient hover:opacity-90 disabled:opacity-50 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Request <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Quick contact */}
          <div className="mt-8 flex items-center justify-center gap-6 text-sm">
            <a
              href={`tel:${site.phoneRaw}`}
              className="flex items-center gap-2 text-pine-600 hover:text-gold-600 transition-colors"
            >
              <Phone className="w-4 h-4" /> {site.phone}
            </a>
            <span className="text-pine-300">|</span>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-pine-600 hover:text-gold-600 transition-colors"
            >
              <Mail className="w-4 h-4" /> Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
