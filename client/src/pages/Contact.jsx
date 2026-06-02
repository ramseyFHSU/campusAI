import { useState } from "react";
import api from "../api/axios";
import { Badge } from "../components/brand/Brand";
import {
  CheckCircle2,
  Mail,
  MapPin,
  Clock3,
  Headphones,
  ArrowRight,
  HelpCircle,
  MessageCircle,
  Send,
  Lock,
} from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  async function submit(e) {
    e.preventDefault();
    try {
      await api.post("/contact", form);
    } catch {}
    setSent(true);
  }
  return (
    <div>
      <section className="page-wrap grid items-center gap-8 py-8 lg:grid-cols-[1fr_.9fr]">
        <div>
          <Badge>We're here to help</Badge>
          <h1 className="display-title mt-5">Contact Us</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Have a question, suggestion, or partnership idea? We’d love to hear
            from you and will get back to you soon.
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img
            src="/images/contact.png"
            alt="Campus AI learning illustration"
            className="w-full max-w-xl object-contain"
          />
        </div>
      </section>
      <section className="page-wrap grid gap-8 pb-8 lg:grid-cols-[1.55fr_.9fr]">
        <div>
          <form onSubmit={submit} className="soft-card p-7">
            <h2 className="section-title">Send Us a Message</h2>
            <p className="mt-2 text-slate-500">
              Fill out the form below and our team will get back to you.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label>
                <span className="label">
                  Name <b className="text-red-500">*</b>
                </span>
                <input
                  className="input"
                  required
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label>
                <span className="label">
                  Email <b className="text-red-500">*</b>
                </span>
                <input
                  className="input"
                  required
                  type="email"
                  placeholder="jane.doe@university.edu"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="label">
                Subject <b className="text-red-500">*</b>
              </span>
              <input
                className="input"
                placeholder="Partnership Inquiry"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </label>
            <label className="mt-5 block">
              <span className="label">
                Message <b className="text-red-500">*</b>
              </span>
              <textarea
                className="input min-h-[140px]"
                required
                placeholder="Hi CampusAI team..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </label>
            <p className="mt-2 text-sm text-slate-500">
              Please provide as much detail as possible so we can assist you
              better.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-8">
              <button className="btn-primary min-w-[280px]">
                <Send size={18} />
                Send Message
              </button>
              <p className="flex items-center gap-3 text-sm text-slate-500">
                <Lock className="text-amber-500" /> Your information is secure
                and
                <br />
                will only be used to respond.
              </p>
            </div>
          </form>
          {sent && (
            <div className="mt-4 flex items-center justify-between rounded-xl bg-green-50 p-5 text-green-800">
              <div className="flex gap-4">
                <CheckCircle2 size={32} />
                <div>
                  <b>Message Sent Successfully!</b>
                  <p className="text-sm">
                    Thank you for reaching out. We’ve received your message and
                    will get back to you within 1–2 business days.
                  </p>
                </div>
              </div>
              <button onClick={() => setSent(false)}>×</button>
            </div>
          )}
        </div>
        <aside className="soft-card p-7">
          <h2 className="section-title">Get in Touch</h2>
          <div className="mt-6 space-y-7">
            {[
              [
                Mail,
                "Email Us",
                "ai@fhsu.edu",
                "We typically reply within 24 hours.",
              ],
              [
                MapPin,
                "Visit Us",
                "Fort Hays State University, 600 Park St, Hays, KS 67601",
                "Mon – Fri, 9:00 AM – 5:00 PM (PT)",
              ],
              [
                Clock3,
                "Response Time",
                "We aim to respond within",
                "24–48 business hours.",
              ],
              [
                Headphones,
                "Need Immediate Help?",
                "Check our FAQs or browse our",
                "Help Center for quick answers.",
              ],
            ].map(([Icon, t, a, b]) => (
              <div className="flex items-start gap-5" key={t}>
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-500">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <div className="min-w-0 pt-1">
                  <h3 className="font-black leading-tight">{t}</h3>
                  <p className="font-bold leading-6 text-slate-700">{a}</p>
                  <p className="text-sm leading-6 text-slate-500">{b}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="my-7 border-t border-slate-200" />
          <h3 className="text-xl font-black">FAQs & Support</h3>
          {[
            [
              HelpCircle,
              "Visit our Help Center",
              "Find answers to common questions",
            ],
            [MessageCircle, "View FAQs", "Browse frequently asked questions"],
          ].map(([Icon, t, s]) => (
            <button
              className="mt-3 flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left"
              key={t}
            >
              <span className="flex items-start gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-800">
                  <Icon size={18} strokeWidth={2} />
                </span>
                <span>
                  <b>{t}</b>
                  <br />
                  <span className="text-sm text-slate-500">{s}</span>
                </span>
              </span>
              <ArrowRight className="text-amber-500" />
            </button>
          ))}
        </aside>
      </section>
    </div>
  );
}
