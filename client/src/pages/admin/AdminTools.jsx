import { useEffect, useState } from "react";
import api from "../../api/axios";
export default function AdminTools() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [editing, setEditing] = useState(null);
  const load = () =>
    api
      .get("/tools/admin/all", { params: filter ? { status: filter } : {} })
      .then((r) => setItems(r.data));
  useEffect(() => {
    load();
  }, [filter]);
  const setStatus = async (id, status) => {
    const adminNotes =
      status === "rejected"
        ? prompt("Optional admin notes for rejection:") || ""
        : "";
    await api.patch(`/tools/${id}/status`, { status, adminNotes });
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this tool?")) return;

    await api.delete(`/tools/${id}`);
    load();
  };
  const saveEdit = async (e) => {
    e.preventDefault();
    await api.put(`/tools/${editing._id}`, editing);
    setEditing(null);
    load();
  };
  return (
    <div>
      <h1 className="page-title mb-4">Tool review</h1>
      <div className="mb-4 flex gap-2 flex-wrap">
        {["pending", "approved", "rejected", ""].map((s) => (
          <button
            key={s || "all"}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-sm border ${filter === s ? "bg-brand-600 text-white border-brand-600" : "bg-white"}`}
          >
            {s || "all"}
          </button>
        ))}
      </div>
      <div className="card divide-y">
        {items.map((t) => (
          <div
            key={t._id}
            className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          >
            <div>
              <p className="font-semibold">
                {t.name}{" "}
                <span className="text-xs ml-2 text-slate-500">
                  [{t.status}]
                </span>
              </p>
              <p className="text-sm text-slate-600 line-clamp-2">
                {t.description}
              </p>
              <p className="text-xs text-slate-400">By {t.submittedBy?.name}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                className="btn-ghost text-sm"
                onClick={() =>
                  setEditing({
                    ...t,
                    capabilitiesText: t.capabilities?.join(", ") || "",
                    tagsText: t.tags?.join(", ") || "",
                    mainUsersText: t.mainUsers?.join(", ") || "",
                  })
                }
              >
                Edit
              </button>
              <button
                className="btn-ghost text-sm"
                onClick={() => setStatus(t._id, "approved")}
              >
                Approve
              </button>
              <button
                className="btn-ghost text-sm"
                onClick={() => setStatus(t._id, "rejected")}
              >
                Reject
              </button>
              <button
                className="btn-ghost text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => remove(t._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="p-4 text-slate-500">Nothing to show.</p>
        )}
      </div>
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={saveEdit}
            className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-3 max-h-[90vh] overflow-auto"
          >
            <h2 className="text-xl font-semibold">Edit tool</h2>
            <input
              className="input"
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            />
            <input
              className="input"
              value={editing.url}
              onChange={(e) => setEditing({ ...editing, url: e.target.value })}
            />
            <textarea
              className="input"
              rows="3"
              value={editing.description}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
            />
            <textarea
              className="input"
              rows="2"
              value={editing.purpose || ""}
              onChange={(e) =>
                setEditing({ ...editing, purpose: e.target.value })
              }
            />
            <input
              className="input"
              value={editing.category || ""}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value })
              }
            />
            <textarea
              className="input"
              rows="2"
              placeholder="Admin notes"
              value={editing.adminNotes || ""}
              onChange={(e) =>
                setEditing({ ...editing, adminNotes: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
              <button className="btn-primary">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
