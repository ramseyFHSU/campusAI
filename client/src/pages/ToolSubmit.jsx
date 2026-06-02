import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
  UploadCloud,
  MessageSquare,
} from "lucide-react";
import api from "../api/axios";
import { HeroArt } from "../components/brand/Brand";

const audiences = [
  "student",
  "faculty",
  "researcher",
  "developer",
  "designer",
  "content-creator",
  "staff",
];
const categories = [
  "Research",
  "Writing",
  "Design",
  "Coding",
  "Presentation",
  "Productivity",
  "Education",
  "General",
];

export default function ToolSubmit() {
  const nav = useNavigate();
  const [mode, setMode] = useState("tool");
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    purpose: "",
    capabilities: "",
    url: "",
    mainUsers: "",
    tags: "",
  });
  const [logo, setLogo] = useState(null);
  const [story, setStory] = useState({ title: "", content: "", media: null });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "tool") {
        const fd = new FormData();
        Object.entries(form).forEach(([key, value]) => fd.append(key, value));
        if (logo) fd.append("logo", logo);
        await api.post("/tools", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        nav("/my-contributions");
      } else {
        const fd = new FormData();
        fd.append("title", story.title);
        fd.append("content", story.content);
        if (story.media) fd.append("media", story.media);
        await api.post("/stories", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        nav("/my-contributions");
      }
    } catch (ex) {
      const msg =
        ex.response?.data?.message ||
        ex.response?.data?.errors?.[0]?.msg ||
        "Submission failed. Please check the form and try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <section className="page-wrap grid items-center gap-8 py-7 lg:grid-cols-[1fr_400px]">
        <div>
          <p className="text-sm text-slate-500">
            <Link to="/">Home</Link> › Contribute
          </p>
          <h1 className="mt-8 text-5xl font-black tracking-[-.05em]">
            Contribute to Campus <span className="text-amber-500">AI</span>
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Submit AI tools and share real campus experiences. Your contribution
            helps build a smarter learning community.
          </p>
        </div>
        <HeroArt className="min-h-[190px]" />
      </section>

      <section className="page-wrap grid gap-6 pb-8 lg:grid-cols-[1fr_360px]">
        <div className="soft-card grid md:grid-cols-[210px_1fr]">
          <aside className="border-r border-slate-200">
            <button
              type="button"
              onClick={() => setMode("tool")}
              className={`flex w-full items-center gap-4 p-6 font-black ${mode === "tool" ? "border-l-4 border-amber-400 bg-amber-50" : "text-slate-600"}`}
            >
              <div className="gold-icon h-10 w-10">
                <Lightbulb size={18} />
              </div>
              Submit AI Tool
            </button>
            <button
              type="button"
              onClick={() => setMode("story")}
              className={`flex w-full items-center gap-4 p-6 font-black ${mode === "story" ? "border-l-4 border-amber-400 bg-amber-50" : "text-slate-600"}`}
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100">
                <MessageSquare size={18} />
              </div>
              Share Your Story
            </button>
          </aside>

          <form onSubmit={submit} className="p-7">
            <div className="mb-6 flex items-center gap-4">
              <div className="gold-icon h-12 w-12">
                {mode === "tool" ? <Lightbulb /> : <MessageSquare />}
              </div>
              <div>
                <h2 className="section-title">
                  {mode === "tool" ? "Submit AI Tool" : "Share Your Story"}
                </h2>
                <p className="text-slate-500">
                  {mode === "tool"
                    ? "Add a new AI tool that can help the campus community."
                    : "Tell others how AI helped your learning or teaching."}
                </p>
              </div>
            </div>
            {error && (
              <div className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            {mode === "tool" ? (
              <>
                <div className="grid gap-5 md:grid-cols-2">
                  <label>
                    <span className="label">
                      Tool Name <b className="text-red-500">*</b>
                    </span>
                    <input
                      className="input"
                      required
                      placeholder="e.g., ScholarAssist"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    <span className="label">
                      Category <b className="text-red-500">*</b>
                    </span>
                    <select
                      required
                      className="input"
                      value={form.category}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          category: e.target.value.toLowerCase(),
                        })
                      }
                    >
                      <option value="">Select a category</option>
                      {categories.map((c) => (
                        <option key={c} value={c.toLowerCase()}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="label">
                      Description <b className="text-red-500">*</b>
                    </span>
                    <textarea
                      className="input"
                      required
                      minLength={10}
                      placeholder="Briefly describe what this tool does."
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    <span className="label">
                      Purpose <b className="text-red-500">*</b>
                    </span>
                    <textarea
                      className="input"
                      required
                      minLength={10}
                      placeholder="What problem does this tool solve?"
                      value={form.purpose}
                      onChange={(e) =>
                        setForm({ ...form, purpose: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    <span className="label">
                      Capabilities <b className="text-red-500">*</b>
                    </span>
                    <textarea
                      className="input"
                      required
                      placeholder="List key features, separated by commas."
                      value={form.capabilities}
                      onChange={(e) =>
                        setForm({ ...form, capabilities: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    <span className="label">
                      URL <b className="text-red-500">*</b>
                    </span>
                    <input
                      className="input"
                      required
                      type="url"
                      placeholder="https://example.com"
                      value={form.url}
                      onChange={(e) =>
                        setForm({ ...form, url: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    <span className="label">
                      Main Users <b className="text-red-500">*</b>
                    </span>
                    <select
                      required
                      className="input"
                      value={form.mainUsers}
                      onChange={(e) =>
                        setForm({ ...form, mainUsers: e.target.value })
                      }
                    >
                      <option value="">Select who can benefit</option>
                      {audiences.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="label">Tags</span>
                    <input
                      className="input"
                      placeholder="writing, research, students"
                      value={form.tags}
                      onChange={(e) =>
                        setForm({ ...form, tags: e.target.value })
                      }
                    />
                  </label>
                </div>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div>
                    <span className="label">Upload Logo</span>
                    <label className="block cursor-pointer rounded-xl border border-dashed border-slate-300 p-5 text-center text-slate-500 hover:border-amber-400 hover:bg-amber-50">
                      <UploadCloud className="mx-auto" />
                      {logo ? (
                        <span className="font-bold text-slate-800">
                          {logo.name}
                        </span>
                      ) : (
                        <>
                          Click to upload or drag and drop
                          <br />
                          PNG, JPG, WEBP or SVG
                        </>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                        onChange={(e) => setLogo(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                  <div className="self-end rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm">
                    <Lightbulb className="inline text-amber-500" /> Tip: Upload
                    a square logo. It will be stored by the backend and
                    displayed with the tool.
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-5">
                <label>
                  <span className="label">
                    Story Title <b className="text-red-500">*</b>
                  </span>
                  <input
                    className="input"
                    required
                    value={story.title}
                    onChange={(e) =>
                      setStory({ ...story, title: e.target.value })
                    }
                  />
                </label>
                <label>
                  <span className="label">
                    Story Content <b className="text-red-500">*</b>
                  </span>
                  <textarea
                    className="input min-h-[180px]"
                    required
                    value={story.content}
                    onChange={(e) =>
                      setStory({ ...story, content: e.target.value })
                    }
                  />
                </label>
                <label>
                  <span className="label">Optional Image or Video</span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) =>
                      setStory({ ...story, media: e.target.files?.[0] || null })
                    }
                  />
                </label>
              </div>
            )}

            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-slate-600">
              <ShieldCheck className="mr-2 inline text-amber-500" />
              All submissions are reviewed by admins before they go live.
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <Link to="/my-contributions" className="btn-outline !py-2">
                Cancel
              </Link>
              <button
                disabled={submitting}
                className="btn-primary !py-2 disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit for Review"}{" "}
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>

        <aside className="soft-card p-6">
          <h3 className="flex gap-3 text-xl font-black">
            <Lightbulb className="text-amber-500" />
            Submission Tips
          </h3>
          <div className="mt-5 space-y-5">
            {[
              [
                "Be Clear & Specific",
                "Provide accurate details so others know who the tool is for.",
              ],
              [
                "Highlight Value",
                "Explain how it helps students, educators, or the campus community.",
              ],
              ["Use Relevant Tags", "Add tags to improve discovery."],
              [
                "Follow Guidelines",
                "Avoid promotional content and submit appropriate content.",
              ],
            ].map(([t, d]) => (
              <div className="flex gap-4" key={t}>
                <HelpCircle className="shrink-0 text-slate-500" />
                <p>
                  <b>{t}</b>
                  <br />
                  <span className="text-sm text-slate-500">{d}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="my-6 border-t" />
          <h3 className="flex gap-3 text-xl font-black">
            <ShieldCheck className="text-amber-500" />
            Review Process
          </h3>
          {[
            "Submitted|You submit your tool or story.",
            "Under Review|Admins review for quality and relevance.",
            "Approved|Once approved, it goes live.",
            "Featured|Strong contributions may be featured.",
          ].map((x, i) => {
            const [t, d] = x.split("|");
            return (
              <div className="mt-4 flex gap-4" key={t}>
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full font-black ${i < 2 ? "bg-amber-400" : "bg-slate-200"}`}
                >
                  {i + 1}
                </span>
                <p>
                  <b>{t}</b>
                  <br />
                  <span className="text-sm text-slate-500">{d}</span>
                </p>
              </div>
            );
          })}
        </aside>
      </section>
    </div>
  );
}
