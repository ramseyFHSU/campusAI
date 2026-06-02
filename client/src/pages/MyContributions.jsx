import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock3,
  Eye,
  Grid2X2,
  HelpCircle,
  Mail,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import api, { apiBase } from "../api/axios";
import { useAuth } from "../context/AuthContext";

function avatarUrl(path) {
  if (!path) return "";
  return path.startsWith("http") ? path : `${apiBase}${path}`;
}

function Stat({ Icon, title, value, sub }) {
  return (
    <div className="soft-card flex items-center gap-5 p-5">
      <div className="gold-icon h-16 w-16">
        <Icon size={26} />
      </div>
      <div>
        <p className="font-black">{title}</p>
        <p className="text-3xl font-black">{value}</p>
        <p className="mt-1 text-sm text-slate-500">{sub}</p>
      </div>
    </div>
  );
}

function Status({ s }) {
  const cls =
    s === "approved"
      ? "bg-green-100 text-green-600"
      : s === "pending"
        ? "bg-amber-100 text-amber-600"
        : "bg-red-100 text-red-600";
  return (
    <span
      className={`rounded-lg px-4 py-1.5 text-sm font-black capitalize ${cls}`}
    >
      {s}
    </span>
  );
}

export default function MyContributions() {
  const { user } = useAuth();
  const [tools, setTools] = useState([]);
  const [stories, setStories] = useState([]);
  const [tab, setTab] = useState("tools");
  const [loading, setLoading] = useState(true);

  const load = () =>
    Promise.all([
      api.get("/tools/mine/list").then((r) => setTools(r.data || [])),
      api.get("/stories/mine/list").then((r) => setStories(r.data || [])),
    ]).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const removeStory = async (storyId) => {
    if (!confirm("Delete this story?")) return;
    await api.delete(`/stories/${storyId}`);
    setStories((current) => current.filter((story) => story._id !== storyId));
  };

  const pending = tools.filter((tool) => tool.status === "pending").length;
  const approved = tools.filter((tool) => tool.status === "approved").length;

  return (
    <div>
      <section className="page-wrap py-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 className="display-title !text-5xl">My Dashboard</h1>
            <p className="mt-2 text-lg text-slate-500">
              Welcome back, {user?.name || "Member"}! Here's what's happening
              with your contributions.
            </p>
          </div>
          <div className="flex gap-5">
            <Link to="/contribute" className="btn-primary">
              <Plus />
              Submit New Tool
            </Link>
            <Link to="/stories/new" className="btn-outline">
              <Users />
              Share a Story
            </Link>
          </div>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-4">
          <Stat
            Icon={Grid2X2}
            title="My Submitted Tools"
            value={tools.length}
            sub={`${approved} Approved • ${pending} Pending`}
          />
          <Stat
            Icon={BookOpen}
            title="My Stories"
            value={stories.length}
            sub="Published in the community"
          />
          <Stat
            Icon={Clock3}
            title="Pending Reviews"
            value={pending}
            sub="Tool submissions waiting"
          />
          <div className="soft-card p-5">
            <div className="gold-icon h-14 w-14">
              <Eye />
            </div>
            <p className="mt-3 font-black">Profile</p>
            <p className="text-3xl font-black">Ready</p>
            <Link
              to="/profile"
              className="mt-4 inline-flex font-black text-amber-600"
            >
              Edit Profile →
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="soft-card p-5">
            <div className="flex justify-between">
              <h2 className="section-title">Recent Submissions</h2>
              <Link
                to={tab === "tools" ? "/tools" : "/stories"}
                className="font-black text-amber-500"
              >
                View All Activity →
              </Link>
            </div>

            <div className="mt-5 flex gap-8 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setTab("tools")}
                className={`pb-3 font-black ${tab === "tools" ? "border-b-2 border-amber-400" : "text-slate-500"}`}
              >
                My Tools
              </button>
              <button
                type="button"
                onClick={() => setTab("stories")}
                className={`pb-3 font-black ${tab === "stories" ? "border-b-2 border-amber-400" : "text-slate-500"}`}
              >
                My Stories
              </button>
            </div>

            {loading ? (
              <p className="mt-5 text-slate-500">Loading...</p>
            ) : tab === "tools" ? (
              <div className="overflow-x-auto">
                <table className="mt-3 w-full text-left text-sm">
                  <thead className="text-xs uppercase text-slate-400">
                    <tr>
                      <th className="py-3">Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Last Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tools.map((tool) => (
                      <tr key={tool._id}>
                        <td className="py-4">
                          <b>{tool.name}</b>
                          <p className="text-slate-500">{tool.description}</p>
                        </td>
                        <td className="capitalize">{tool.category}</td>
                        <td>
                          <Status s={tool.status} />
                        </td>
                        <td className="text-slate-500">
                          {new Date(tool.updatedAt).toLocaleDateString()}
                        </td>
                        <td>
                          <Link
                            to={`/tools/${tool._id}`}
                            className="rounded-lg border border-slate-200 px-5 py-2 font-black"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!tools.length && (
                  <p className="p-6 text-center text-slate-500">
                    You have not submitted any tools yet.
                  </p>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="mt-3 w-full text-left text-sm">
                  <thead className="text-xs uppercase text-slate-400">
                    <tr>
                      <th className="py-3">Title</th>
                      <th>Media</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stories.map((story) => (
                      <tr key={story._id}>
                        <td className="py-4">
                          <b>{story.title}</b>
                          <p className="line-clamp-1 text-slate-500">
                            {story.content}
                          </p>
                        </td>
                        <td className="capitalize">{story.mediaType}</td>
                        <td className="text-slate-500">
                          {new Date(story.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="flex flex-wrap gap-2">
                            <Link
                              to={`/stories/${story._id}`}
                              className="rounded-lg border border-slate-200 px-5 py-2 font-black"
                            >
                              View
                            </Link>
                            <button
                              type="button"
                              onClick={() => removeStory(story._id)}
                              className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 font-black text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={16} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!stories.length && (
                  <p className="p-6 text-center text-slate-500">
                    You have not shared any stories yet.
                  </p>
                )}
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="soft-card overflow-hidden">
              <div className="photo-card h-24" />
              <div className="relative px-5 pb-5 pt-12 text-center">
                <div className="absolute left-1/2 top-0 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-full border-4 border-white bg-slate-800 text-3xl text-white">
                  {user?.avatar ? (
                    <img
                      src={avatarUrl(user.avatar)}
                      alt={user?.name || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user?.name?.[0] || "U"
                  )}
                </div>
                <h2 className="text-2xl font-black">
                  {user?.name || "Member"}
                </h2>
                <p className="text-slate-500">{user?.email}</p>
                <Link to="/profile" className="btn-outline mt-4 w-full !py-2">
                  Edit Profile
                </Link>
              </div>
            </div>
            <div className="soft-card p-5">
              <h3 className="font-black">Your Impact</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <span>
                  <Grid2X2 className="inline text-amber-500" /> {tools.length}{" "}
                  Tools
                </span>
                <span>
                  <BookOpen className="inline text-amber-500" />{" "}
                  {stories.length} Stories
                </span>
              </div>
            </div>
          </aside>
        </div>

        <div className="soft-card mt-6 flex flex-wrap items-center justify-between gap-4 bg-amber-50/50 p-4">
          <div className="flex items-center gap-5">
            <div className="gold-icon h-16 w-16">
              <HelpCircle />
            </div>
            <div>
              <h3 className="text-xl font-black">
                Need Help or Have Feedback?
              </h3>
              <p className="text-slate-500">
                We’re here to support your CampusAI journey.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link to="/contact" className="btn-outline !py-2">
              <Mail />
              Contact Support
            </Link>
            <Link to="/contribute" className="btn-primary !py-2">
              Share Feedback
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
