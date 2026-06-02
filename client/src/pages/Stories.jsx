import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Heart, Plus, Search, Users } from "lucide-react";
import api from "../api/axios";
import StoryCard from "../components/stories/StoryCard";
import { Badge, HeroArt } from "../components/brand/Brand";
import { useAuth } from "../context/AuthContext";

export default function Stories() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/stories", { params: { limit: 50 } })
      .then((r) => setItems(r.data.items || []))
      .finally(() => setLoading(false));
  }, []);
  const filtered = items.filter((s) =>
    `${s.title} ${s.content}`.toLowerCase().includes(q.toLowerCase()),
  );
  const featuredStory = items[0];
  return (
    <div>
      <section className="page-wrap grid items-center gap-8 py-8 lg:grid-cols-[1fr_.9fr]">
        <div>
          <Badge>Community Stories</Badge>
          <h1 className="display-title mt-5">Community Stories</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Real experiences from students, educators, and campuses using AI to
            learn, teach, and make a difference.
          </p>
          {user && (
            <Link to="/stories/new" className="btn-primary mt-7 inline-flex">
              <Plus size={18} /> Share Your Story
            </Link>
          )}
        </div>
        <div className="flex justify-center lg:justify-end">
          <img
            src="/images/story.png"
            alt="Campus AI learning illustration"
            className="w-full max-w-xl object-contain"
          />
        </div>
      </section>
      <section className="page-wrap pb-8">
        {featuredStory ? (
          <Link
            to={`/stories/${featuredStory._id}`}
            className="soft-card mb-6 grid gap-5 p-5 transition hover:shadow-lg lg:grid-cols-[1.2fr_1fr]"
          >
            {featuredStory.image ? (
              <img
                src={featuredStory.image}
                alt={featuredStory.title}
                className="h-[190px] w-full rounded-xl object-cover"
              />
            ) : (
              <div className="photo-card min-h-[190px] rounded-xl" />
            )}

            <div className="flex flex-col justify-center">
              <Badge>Featured Story</Badge>

              <h2 className="mt-4 text-3xl font-black leading-tight">
                {featuredStory.title}
              </h2>

              <p className="mt-2 line-clamp-3 text-slate-600">
                {featuredStory.content}
              </p>

              <p className="mt-4 text-sm font-bold text-slate-500">
                By {featuredStory.createdBy?.name || "Community Member"} ·{" "}
                {new Date(featuredStory.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ) : (
          <div className="soft-card mb-6 grid gap-5 p-5 lg:grid-cols-[1.2fr_1fr]">
            <div className="photo-card min-h-[190px] rounded-xl" />

            <div className="flex flex-col justify-center">
              <Badge>Featured Story</Badge>

              <h2 className="mt-4 text-3xl font-black">
                Your campus stories will appear here
              </h2>

              <p className="mt-2 text-slate-600">
                When users share stories, one of them will appear here as the
                featured story.
              </p>
            </div>
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-[1fr_220px_220px_220px]">
          <label className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              className="input pl-14"
              placeholder="Search stories..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
          <select className="input">
            <option>All Story Types</option>
          </select>
          <select className="input">
            <option>All AI Tools</option>
          </select>
          <select className="input">
            <option>Most Recent</option>
          </select>
        </div>
        {loading ? (
          <p className="mt-8 text-slate-500">Loading stories...</p>
        ) : filtered.length ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </div>
        ) : (
          <div className="card mt-6 p-8 text-center">
            <h2 className="text-2xl font-black">No stories yet</h2>
            <p className="mt-2 text-slate-600">
              When users share stories, they will appear here.
            </p>
            {user && (
              <Link to="/stories/new" className="btn-primary mt-5">
                Share the first story
              </Link>
            )}
          </div>
        )}
        <div className="soft-card mt-8 grid gap-6 p-5 md:grid-cols-4">
          <div className="flex gap-4">
            <div className="gold-icon h-14 w-14">
              <BookOpen />
            </div>
            <div>
              <b>Stories Shared</b>
              <p className="text-sm text-slate-500">
                Real experiences from campuses
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="gold-icon h-14 w-14">
              <Users />
            </div>
            <div>
              <b>Community Members</b>
              <p className="text-sm text-slate-500">Students and educators</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="gold-icon h-14 w-14">
              <Heart />
            </div>
            <div>
              <b>Inspiring Impact</b>
              <p className="text-sm text-slate-500">
                Real ideas solving problems
              </p>
            </div>
          </div>
          {user && (
            <Link to="/stories/new" className="btn-outline">
              Share Your Story
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
