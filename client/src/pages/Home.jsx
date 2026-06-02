import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Grid2X2,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";
import api from "../api/axios";
import ToolCard from "../components/tools/ToolCard";
import StoryCard from "../components/stories/StoryCard";
import { Badge } from "../components/brand/Brand";

function Stat({ Icon, value, label, sub }) {
  return (
    <div className="flex items-center gap-4">
      <div className="gold-icon h-14 w-14">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-2xl font-black">{value}</p>
        <p className="font-bold">{label}</p>
        <p className="text-sm text-slate-500">{sub}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [tools, setTools] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api
        .get("/tools", { params: { limit: 3 } })
        .then((r) => setTools(r.data.items || [])),
      api
        .get("/stories", { params: { limit: 1 } })
        .then((r) => setStories(r.data.items || [])),
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="page-wrap grid items-center gap-10 py-8 lg:grid-cols-[.88fr_1.12fr]">
        <div>
          <Badge>AI for Every Campus</Badge>
          <h1 className="display-title mt-5">
            Discover AI Tools for Learning, Teaching, and{" "}
            <span className="text-amber-500">Innovation</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            CampusAI brings together the best AI tools, real campus stories, and
            a community of forward-thinkers shaping the future of education.
          </p>
          <div className="mt-7 flex flex-wrap gap-5">
            <Link to="/tools" className="btn-primary">
              Explore Tools <ArrowRight size={18} />
            </Link>
            <Link to="/signup" className="btn-outline">
              <Users size={18} /> Join the Community
            </Link>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img
            src="/images/campus-ai-hero2.png"
            alt="Campus AI learning illustration"
            className="w-full max-w-3xl object-contain"
          />
        </div>
      </section>

      <section className="page-wrap">
        <div className="soft-card grid gap-6 p-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex gap-5">
            <div className="gold-icon h-16 w-16 shrink-0">
              <BookOpen />
            </div>
            <div>
              <h2 className="text-xl font-black">
                Empowering Campuses with Responsible AI
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Discover, evaluate, and share AI tools that enhance teaching,
                accelerate learning, and drive innovation across disciplines.
              </p>
            </div>
          </div>
          <div className="border-l border-slate-200 pl-6">
            <ShieldCheck className="text-amber-500" />
            <b>Curated & Trusted</b>
            <p className="mt-2 text-sm text-slate-500">
              Approved tools appear publicly after admin review.
            </p>
          </div>
          <div className="border-l border-slate-200 pl-6">
            <Users className="text-amber-500" />
            <b>Community Driven</b>
            <p className="mt-2 text-sm text-slate-500">
              Share experiences and learn from peers.
            </p>
          </div>
          <div className="border-l border-slate-200 pl-6">
            <Lightbulb className="text-amber-500" />
            <b>Inspire Innovation</b>
            <p className="mt-2 text-sm text-slate-500">
              Find ideas and tools for real campus problems.
            </p>
          </div>
        </div>
      </section>

      <section className="page-wrap grid gap-8 py-8 xl:grid-cols-[2fr_1fr]">
        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="section-title">Featured AI Tools</h2>
            <Link to="/tools" className="shrink-0 font-black text-amber-500">
              View all tools <ArrowRight className="inline" size={16} />
            </Link>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading tools...</p>
          ) : tools.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {tools.map((tool) => (
                <ToolCard key={tool._id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="card p-6 text-slate-600">
              No approved tools yet. Approved submissions will appear here.
            </div>
          )}
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="section-title">Featured Stories</h2>
            <Link to="/stories" className="shrink-0 font-black text-amber-500">
              View all stories <ArrowRight className="inline" size={16} />
            </Link>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading stories...</p>
          ) : stories.length ? (
            <div className="grid gap-5">
              {stories.slice(0, 1).map((story) => (
                <StoryCard key={story._id} story={story} />
              ))}
            </div>
          ) : (
            <div className="card p-6 text-slate-600">
              No stories yet. Community stories will appear here.
            </div>
          )}
        </div>
      </section>

      <section className="page-wrap pb-8">
        <div className="soft-card grid gap-6 p-5 md:grid-cols-4">
          <Stat
            Icon={Grid2X2}
            value="Live"
            label="AI Tools"
            sub="Connected to your database"
          />
          <Stat
            Icon={BookOpen}
            value="Live"
            label="Stories Shared"
            sub="Created by your users"
          />
          <Stat
            Icon={Users}
            value="Role-Based"
            label="Community"
            sub="Users and admins"
          />
          <Stat
            Icon={Lightbulb}
            value="Ready"
            label="Innovation"
            sub="Deployable MERN app"
          />
        </div>
      </section>
    </div>
  );
}
