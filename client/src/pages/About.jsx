import { Link } from "react-router-dom";
import {
  CheckCircle2,
  BookOpen,
  Clock3,
  Rocket,
  Users,
  Target,
  Eye,
  Shield,
  Globe2,
  Sparkles,
} from "lucide-react";
import { Badge } from "../components/brand/Brand";

const matter = [
  [
    BookOpen,
    "Enhances Learning",
    "AI personalizes learning experiences and adapts to individual needs.",
  ],
  [
    Clock3,
    "Saves Time",
    "Automate repetitive tasks so students and educators can focus on what matters.",
  ],
  [
    Rocket,
    "Drives Innovation",
    "AI empowers creative problem-solving and real-world application.",
  ],
  [
    Users,
    "Prepares for Future",
    "Build in-demand skills and confidence for an AI-powered world.",
  ],
];

const values = [
  [
    Shield,
    "Trust",
    "We prioritize privacy, transparency, and ethical AI practices to build lasting trust.",
  ],
  [
    Globe2,
    "Accessibility",
    "We strive to make AI tools and knowledge accessible to everyone, everywhere.",
  ],
  [
    Sparkles,
    "Innovation",
    "We embrace curiosity and creativity to drive meaningful progress in education.",
  ],
  [
    Users,
    "Community",
    "We believe in the power of collaboration and shared success.",
  ],
];

export default function About() {
  return (
    <div>
      <section className="page-wrap grid items-center gap-8 py-8 lg:grid-cols-[1fr_.95fr]">
        <div>
          <Badge>AI for Every Campus</Badge>
          <h1 className="display-title mt-5">
            About <span className="text-amber-500">CampusAI</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            CampusAI is a trusted platform that connects students, educators,
            and institutions with the best AI tools, real campus stories, and a
            community committed to shaping the future of education.
          </p>
          <div className="mt-7 flex gap-5">
            <Link to="/tools" className="btn-primary">
              Explore AI Tools
            </Link>
            <Link to="/signup" className="btn-outline">
              Join the Community
            </Link>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img
            src="/images/About2.png"
            alt="Campus AI learning illustration"
            className="w-full max-w-xl object-contain"
          />
        </div>
      </section>

      <section className="page-wrap">
        <div className="soft-card grid gap-8 p-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="flex flex-col justify-center">
            <h2 className="section-title">Our Purpose</h2>
            <div className="mt-2 h-1 w-8 rounded bg-amber-400" />
            <p className="mt-5 leading-7 text-slate-600">
              We believe AI can unlock human potential and transform how we
              learn, teach, and solve problems. CampusAI exists to:
            </p>
            <ul className="mt-4 space-y-3 text-slate-700">
              {[
                "Discover and curate the best AI tools for education.",
                "Empower students and educators with knowledge and resources.",
                "Foster a community of forward-thinkers driving innovation.",
                "Promote responsible AI use in academic and campus life.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 leading-7">
                  <CheckCircle2
                    className="mt-1 shrink-0 text-amber-500"
                    size={18}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {matter.map(([Icon, title, description]) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-100 text-amber-500 transition group-hover:bg-amber-400 group-hover:text-white">
                    <Icon size={22} strokeWidth={2.3} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black leading-tight text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-wrap grid gap-8 py-8 lg:grid-cols-[.9fr_1.1fr]">
        <div className="soft-card grid gap-8 p-6 md:grid-cols-2">
          <div className="border-slate-200 md:border-r md:pr-6">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-amber-100 text-amber-500">
              <Target size={24} />
            </div>
            <h3 className="mt-4 text-xl font-black">Our Mission</h3>
            <p className="mt-4 leading-7 text-slate-600">
              To empower campuses worldwide by curating, educating, and
              connecting communities through AI tools that inspire learning,
              teaching, and innovation.
            </p>
          </div>
          <div>
            <div className="grid h-14 w-14 place-items-center rounded-full bg-amber-100 text-amber-500">
              <Eye size={24} />
            </div>
            <h3 className="mt-4 text-xl font-black">Our Vision</h3>
            <p className="mt-4 leading-7 text-slate-600">
              A world where every student and educator has access to the right
              AI tools, knowledge, and community to create a better, more
              inclusive future.
            </p>
          </div>
        </div>
        <div className="soft-card p-6 lg:p-8">
          <h2 className="section-title text-center">
            Our Journey & Future Vision
          </h2>

          <div className="relative mt-10">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-5 hidden h-1 rounded-full bg-slate-200 md:block" />
            <div className="absolute left-0 top-5 hidden h-1 w-1/2 rounded-full bg-amber-400 md:block" />

            <div className="relative grid gap-6 md:grid-cols-4">
              {[
                "2026|Launch|Founded CampusAI to curate tools and experiences.",
                "2027|Grow Community|Expand our community of students, educators, and institutions.",
                "2028|AI Literacy Initiative|Launch programs and resources to build AI literacy.",
                "2028+|Global Impact|Partner globally to advance responsible AI adoption.",
              ].map((item, index) => {
                const [year, title, description] = item.split("|");
                const completed = index < 2;

                return (
                  <div key={year} className="relative">
                    <div
                      className={`relative z-10 mx-auto grid h-11 w-11 place-items-center rounded-full border-4 shadow-sm ${
                        completed
                          ? "border-amber-400 bg-amber-400 text-white"
                          : "border-amber-400 bg-white text-amber-500"
                      }`}
                    >
                      {completed ? (
                        <CheckCircle2 size={20} strokeWidth={3} />
                      ) : (
                        <span className="h-3 w-3 rounded-full bg-amber-400" />
                      )}
                    </div>

                    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                      <h4 className="text-lg font-black text-slate-900">
                        {year}
                      </h4>
                      <p className="mt-1 font-bold text-slate-800">{title}</p>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap pb-8">
        <div className="soft-card p-6">
          <h2 className="section-title text-center">Our Core Values</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-4">
            {values.map(([Icon, title, description]) => (
              <div key={title} className="card h-full p-5 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber-100 text-amber-500">
                  <Icon size={24} />
                </div>
                <h3 className="mt-4 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
