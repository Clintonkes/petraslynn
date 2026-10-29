import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle2,
  AlertCircle, MessageSquare, Navigation,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { site } from '@/config/site';
import { createContact } from '@/lib/api';
import { pageImages } from "@/config/images";

const { hero: heroImage } = pageImages.contact;

const subjectOptions = [
  'General Question', 'Schedule Service', 'Billing Inquiry',
  'Compliment', 'Complaint', 'Employment', 'Other',
];

interface ContactData {
  name: string; email: string; phone: string; subject: string; message: string;
}

export default function Contact() {
  const [data, setData] = useState<ContactData>({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await createContact({
        name: data.name, email: data.email, phone: data.phone || undefined,
        subject: data.subject, message: data.message,
      });
      setStatus('success');
      setData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`
  )}&output=embed`;

  return (
    <div>
      <PageHeader
        title="Contact Us"
        subtitle="Questions, comments, or ready to schedule? We'd love to hear from you."
        breadcrumb="Contact"
        image={heroImage}
      />

      {/* Contact info cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href={`tel:${site.phoneRaw}`}
              className="group flex flex-col items-center text-center p-7 rounded-2xl border border-pine-100 hover:border-gold-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gold-50 group-hover:bg-gradient-to-br group-hover:from-gold-500 group-hover:to-gold-600 flex items-center justify-center mb-4 transition-all duration-300">
                <Phone className="w-8 h-8 text-gold-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-pine-900 mb-1">Call Us</h3>
              <p className="text-pine-500 text-sm mb-2">Monday to Saturday</p>
              <p className="text-gold-600 font-semibold">{site.phone}</p>
            </a>
            <a href={`mailto:${site.email}`}
              className="group flex flex-col items-center text-center p-7 rounded-2xl border border-pine-100 hover:border-gold-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gold-50 group-hover:bg-gradient-to-br group-hover:from-gold-500 group-hover:to-gold-600 flex items-center justify-center mb-4 transition-all duration-300">
                <Mail className="w-8 h-8 text-gold-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-pine-900 mb-1">Email Us</h3>
              <p className="text-pine-500 text-sm mb-2">Anytime</p>
              <p className="text-gold-600 font-semibold text-sm break-all">{site.email}</p>
            </a>
            <div className="flex flex-col items-center text-center p-7 rounded-2xl border border-pine-100">
              <div className="w-16 h-16 rounded-2xl bg-gold-50 flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-gold-600" />
              </div>
              <h3 className="font-bold text-pine-900 mb-1">Visit Us</h3>
              <p className="text-pine-500 text-sm mb-2">Our Office</p>
              <p className="text-pine-700 text-sm leading-relaxed">
                {site.address.street}<br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Info split */}
      <section className="py-16 bg-pine-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div>
              <div className="bg-white rounded-3xl shadow-lg border border-pine-100 p-8">
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="w-6 h-6 text-gold-500" />
                  <h2 className="text-2xl font-semibold text-pine-900">Send a Message</h2>
                </div>
                <p className="text-pine-500 text-sm mb-8">Fill out the form and we will get back to you as soon as possible.</p>

                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-12 h-12 text-gold-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-pine-900 mb-3">Message Sent!</h3>
                    <p className="text-pine-600 mb-6">Thanks for reaching out. We will respond to your message shortly.</p>
                    <button onClick={() => setStatus('idle')}
                      className="bg-pine-900 hover:bg-pine-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {status === 'error' && (
                      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-red-700 font-medium text-sm">Could not send message</p>
                          <p className="text-red-600 text-sm">{errorMsg}</p>
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-pine-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                        <input type="text" name="name" required value={data.name} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-pine-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm"
                          placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-pine-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                        <input type="email" name="email" required value={data.email} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-pine-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm"
                          placeholder="you@example.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-pine-700 mb-1.5">Phone</label>
                        <input type="tel" name="phone" value={data.phone} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-pine-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm"
                          placeholder="(303) 555 0100" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-pine-700 mb-1.5">Subject <span className="text-red-500">*</span></label>
                        <select name="subject" required value={data.subject} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-pine-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm bg-white">
                          <option value="">Select a subject</option>
                          {subjectOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pine-700 mb-1.5">Message <span className="text-red-500">*</span></label>
                      <textarea name="message" required rows={5} value={data.message} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-pine-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-all text-sm resize-none"
                        placeholder="How can we help you?" />
                    </div>
                    <button type="submit" disabled={status === 'loading'}
                      className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 disabled:opacity-50 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-base">
                      {status === 'loading' ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                      ) : (
                        <>Send Message <Send className="w-5 h-5" /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Hours + Map */}
            <div className="space-y-6">
              <div className="bg-pine-900 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-gold-400" />
                  <h3 className="font-bold text-white text-xl">Business Hours</h3>
                </div>
                <ul className="space-y-3">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex items-center justify-between text-sm border-b border-pine-800 pb-3 last:border-0 last:pb-0">
                      <span className="text-pine-300 font-medium">{h.day}</span>
                      <span className={h.time === 'Closed' ? 'text-red-400' : 'text-gold-400'}>{h.time}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-pine-800">
                  <p className="text-pine-400 text-sm mb-3">Service Areas:</p>
                  <div className="flex flex-wrap gap-2">
                    {site.serviceAreas.map((area) => (
                      <span key={area} className="text-xs bg-pine-800 text-pine-300 px-3 py-1 rounded-full">{area}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-lg border border-pine-100 overflow-hidden">
                <div className="p-5 border-b border-pine-100">
                  <div className="flex items-center gap-3">
                    <Navigation className="w-6 h-6 text-gold-500" />
                    <div>
                      <h3 className="font-bold text-pine-900">Find Our Office</h3>
                      <p className="text-pine-500 text-sm">
                        {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
                      </p>
                    </div>
                  </div>
                </div>
                <iframe title="Office location map" src={mapSrc} className="w-full h-[280px] border-0" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote banner */}
      <section className="py-12 bg-gradient-to-r from-gold-600 to-gold-700">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">Looking for pricing?</h3>
            <p className="text-gold-100 text-sm">Our guided quote form takes two minutes and costs nothing.</p>
          </div>
          <Link to="/quote" className="bg-white hover:bg-pine-100 text-gold-700 font-semibold px-6 py-3 rounded-xl transition-all duration-200 whitespace-nowrap">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
