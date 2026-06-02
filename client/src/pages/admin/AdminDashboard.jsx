import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Box, Check, Grid2X2, Mail, Users, X } from "lucide-react";
import api from "../../api/axios";

function Stat({ Icon, label, value }) {
  return (
    <div className="soft-card flex items-center gap-5 p-6">
      <div className="gold-icon h-16 w-16">
        <Icon size={28} />
      </div>
      <div>
        <p className="text-slate-500">{label}</p>
        <p className="text-3xl font-black">{value ?? 0}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [pendingTools, setPendingTools] = useState([]);
  const [stories, setStories] = useState([]);
  const [users, setUsers] = useState([]);

  const load = () =>
    Promise.all([
      api.get("/admin/stats").then((r) => setStats(r.data)),
      api
        .get("/tools/admin/all", { params: { status: "pending" } })
        .then((r) => setPendingTools(r.data || [])),
      api
        .get("/stories", { params: { limit: 4 } })
        .then((r) => setStories(r.data.items || [])),
      api
        .get("/users", { params: { limit: 5 } })
        .then((r) => setUsers(r.data.items || [])),
    ]);

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id, status) => {
    await api.patch(`/tools/${id}/status`, { status });
    load();
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="mt-2 text-slate-500">
            Welcome back. Here's what's happening on CampusAI.
          </p>
        </div>

        <Link to="/" className="btn-outline !py-2">
          Back to Website
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-4">
        <Stat Icon={Users} label="Total Users" value={stats?.users} />
        <Stat Icon={Box} label="Approved Tools" value={stats?.toolsApproved} />
        <Stat
          Icon={Grid2X2}
          label="Pending Tools"
          value={stats?.toolsPending}
        />
        <Stat Icon={BookOpen} label="Total Stories" value={stats?.stories} />
      </div>

      <div className="mt-7 grid gap-7 lg:grid-cols-[1.1fr_.9fr]">
        <div className="soft-card p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-black">
              Pending Tool Reviews{" "}
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-600">
                {pendingTools.length}
              </span>
            </h2>

            <Link to="/admin/tools" className="font-black text-amber-500">
              View All
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="p-3">Tool Name</th>
                  <th>Submitter</th>
                  <th>Category</th>
                  <th>Submitted On</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {pendingTools.slice(0, 5).map((t) => (
                  <tr key={t._id}>
                    <td className="py-3 font-bold">{t.name}</td>
                    <td>{t.submittedBy?.name || "User"}</td>
                    <td>
                      <span className="rounded-lg bg-amber-100 px-3 py-1 text-xs font-black text-amber-700">
                        {t.category}
                      </span>
                    </td>
                    <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td className="flex gap-2 py-2">
                      <button
                        onClick={() => setStatus(t._id, "approved")}
                        className="rounded-lg border border-green-200 p-2 text-green-600"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => setStatus(t._id, "rejected")}
                        className="rounded-lg border border-red-200 p-2 text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                ))}

                {!pendingTools.length && (
                  <tr>
                    <td className="p-4 text-slate-500" colSpan="5">
                      No pending tools.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="soft-card p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-black">Recent Stories</h2>

            <Link to="/admin/stories" className="font-black text-amber-500">
              View All
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {stories.map((s) => (
              <Link
                to={`/stories/${s._id}`}
                key={s._id}
                className="flex gap-4 rounded-xl border border-slate-100 p-3 hover:border-amber-300"
              >
                <div className="photo-card h-16 w-20 shrink-0 rounded-xl" />
                <div>
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-black text-amber-600">
                    {s.mediaType}
                  </span>
                  <h3 className="mt-1 font-black leading-tight">{s.title}</h3>
                  <p className="text-xs text-slate-500">
                    By {s.createdBy?.name || "User"} ·{" "}
                    {new Date(s.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}

            {!stories.length && (
              <p className="text-slate-500">No stories yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-7 grid gap-7 lg:grid-cols-[1.05fr_.95fr]">
        <div className="soft-card p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-black">Users Overview</h2>

            <Link to="/admin/users" className="font-black text-amber-500">
              View All Users
            </Link>
          </div>

          <table className="mt-4 w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="p-3">User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined On</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="py-3 font-bold">{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-black text-blue-600">
                      {u.role}
                    </span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}

              {!users.length && (
                <tr>
                  <td className="p-4 text-slate-500" colSpan="4">
                    No users yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="soft-card p-6">
          <h2 className="text-xl font-black">Quick Links</h2>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <Link to="/admin/tools" className="card p-5 font-black">
              Review Tools
            </Link>

            <Link to="/admin/users" className="card p-5 font-black">
              Manage Users
            </Link>

            <Link to="/admin/stories" className="card p-5 font-black">
              Stories
            </Link>

            <Link to="/admin/messages" className="card p-5 font-black">
              <Mail className="inline" /> Messages
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
