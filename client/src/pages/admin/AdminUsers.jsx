import { useEffect, useState } from "react";
import { Search, Trash2, UserCog } from "lucide-react";
import api from "../../api/axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");

  const load = () =>
    api
      .get("/users", { params: q ? { q } : {} })
      .then((r) => setUsers(r.data.items));

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [q]);

  const toggleRole = async (u) => {
    await api.put(`/users/${u._id}`, {
      role: u.role === "admin" ? "user" : "admin",
    });
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this user?")) return;
    await api.delete(`/users/${id}`);
    load();
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="mt-2 text-slate-500">
            Manage users, roles, and account access.
          </p>
        </div>

        <div className="relative w-full max-w-sm">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            className="input pl-11"
            placeholder="Search users"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="soft-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-slate-50">
                  <td className="font-bold">{u.name}</td>
                  <td className="text-slate-600">{u.email}</td>
                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black capitalize ${
                        u.role === "admin"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button
                        className="btn-ghost text-xs"
                        onClick={() => toggleRole(u)}
                      >
                        <UserCog size={15} />
                        Make {u.role === "admin" ? "user" : "admin"}
                      </button>

                      <button
                        className="btn-ghost text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => remove(u._id)}
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!users.length && (
                <tr>
                  <td className="p-6 text-center text-slate-500" colSpan="4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
