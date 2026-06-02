import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Plus, Search, Trophy } from "lucide-react";
import api from "../api/axios";
import ToolCard from "../components/tools/ToolCard";
import { Badge, HeroArt } from "../components/brand/Brand";
import { useAuth } from "../context/AuthContext";

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
  "writing",
  "research",
  "presentation",
  "study assistant",
  "image generation",
  "data analysis",
  "coding",
  "productivity",
  "design",
  "general",
];

export default function Tools() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = { page, limit: 10 };
    if (q) params.q = q;
    if (category) params.category = category;
    if (audience) params.audience = audience;
    api
      .get("/tools", { params })
      .then((r) => {
        setItems(r.data.items || []);
        setPages(r.data.pages || 1);
      })
      .finally(() => setLoading(false));
  }, [q, category, audience, page]);

  return (
    <div>
      <section className="page-wrap grid items-center gap-8 py-8 lg:grid-cols-[1fr_.75fr]">
        <div>
          <Badge>AI Tools Directory</Badge>
          <h1 className="display-title mt-5">
            Explore <span className="text-amber-500">AI Tools</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Discover approved AI tools for learning, research, teaching, design,
            and more.
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img
            src="/images/About.png"
            alt="Campus AI learning illustration"
            className="w-full max-w-xl object-contain"
          />
        </div>
      </section>

      <section className="page-wrap pb-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_260px_260px_180px]">
          <label className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              className="input pl-14"
              placeholder="Search AI tools by name, keyword, or use case..."
              value={q}
              onChange={(e) => {
                setPage(1);
                setQ(e.target.value);
              }}
            />
          </label>
          <select
            className="input"
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
          >
            <option value="">All Categories</option>
            {categories.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
          <select
            className="input"
            value={audience}
            onChange={(e) => {
              setPage(1);
              setAudience(e.target.value);
            }}
          >
            <option value="">All Users</option>
            {audiences.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
          <button type="button" className="btn-outline">
            <Filter size={18} /> Filters
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <b className="py-2">Popular:</b>
          {categories.slice(0, 8).map((x) => (
            <button
              type="button"
              key={x}
              onClick={() => {
                setPage(1);
                setCategory(x);
              }}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-bold capitalize hover:border-amber-400"
            >
              {x}
            </button>
          ))}
        </div>

        {user && (
          <Link to="/contribute" className="btn-primary mt-5 inline-flex">
            <Plus size={18} /> Submit a Tool
          </Link>
        )}

        {items[0] && (
          <div className="soft-card mt-6 flex flex-wrap items-center justify-between gap-5 border-amber-200 bg-amber-50/40 p-5">
            <div className="flex items-center gap-5">
              <div className="gold-icon h-16 w-16">
                <Trophy />
              </div>
              <div>
                <p className="font-black text-amber-600">Featured Tool</p>
                <h2 className="text-xl font-black">{items[0].name}</h2>
                <p className="text-sm text-slate-600">{items[0].description}</p>
              </div>
            </div>
            <Link to={`/tools/${items[0]._id}`} className="btn-primary !py-2">
              View Details
            </Link>
          </div>
        )}

        {loading ? (
          <p className="mt-8 text-slate-500">Loading tools...</p>
        ) : items.length ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {items.map((tool) => (
              <ToolCard key={tool._id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="card mt-6 p-8 text-center">
            <h2 className="text-2xl font-black">No approved tools yet</h2>
            <p className="mt-2 text-slate-600">
              Once admins approve submitted tools, they will appear here.
            </p>
            {user && (
              <Link to="/contribute" className="btn-primary mt-5">
                Submit the first tool
              </Link>
            )}
          </div>
        )}

        {pages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <button
              className="btn-outline !px-4 !py-2"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span className="grid h-11 min-w-11 place-items-center rounded-xl bg-amber-400 px-4 font-black">
              {page}
            </span>
            <button
              className="btn-outline !px-4 !py-2"
              disabled={page === pages}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
