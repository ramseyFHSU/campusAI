import { useEffect, useState } from "react";
import api from "../../api/axios";
export default function AdminMessages() {
  const [items, setItems] = useState([]);
  const load = () => api.get("/contact").then((r) => setItems(r.data));
  useEffect(() => {
    load();
  }, []);
  const remove = async (id) => {
    if (!confirm("Delete this message?")) return;
    await api.delete(`/contact/${id}`);
    load();
  };
  return (
    <div>
      <h1 className="page-title mb-4">Contact Messages</h1>
      <div className="grid gap-4">
        {items.map((m) => (
          <article key={m._id} className="card p-5">
            <div className="flex justify-between gap-3">
              <div>
                <h2 className="font-semibold">{m.subject || "No subject"}</h2>
                <p className="text-sm text-slate-500">
                  {m.name} · {m.email} ·{" "}
                  {new Date(m.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => remove(m._id)}
                className="btn-ghost text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
            <p className="mt-3 text-slate-700 whitespace-pre-wrap">
              {m.message}
            </p>
          </article>
        ))}
        {!items.length && <p className="text-slate-500">No messages.</p>}
      </div>
    </div>
  );
}
