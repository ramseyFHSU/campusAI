import { Link, NavLink, Outlet } from "react-router-dom";
import {
  Bell,
  BookOpen,
  Box,
  Check,
  Home,
  MessageSquare,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { BrandLogo } from "../../components/brand/Brand";
import { useAuth } from "../../context/AuthContext";
import { apiBase } from "../../api/axios";

function avatarUrl(path) {
  if (!path) return "";
  return path.startsWith("http") ? path : `${apiBase}${path}`;
}

function SideLink({ to, icon: Icon, children, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-4 rounded-xl px-5 py-4 font-black transition ${
          isActive
            ? "bg-amber-100 text-amber-600"
            : "text-slate-700 hover:bg-amber-50 hover:text-amber-600"
        }`
      }
    >
      <Icon size={20} />
      {children}
    </NavLink>
  );
}

export default function AdminLayout() {
  const { user } = useAuth();

  return (
    <div className="admin-grid min-h-screen bg-slate-50">
      <aside className="admin-sidebar border-r border-slate-200 bg-white p-4">
        <BrandLogo />

        <nav className="mt-10 space-y-2">
          <SideLink to="/admin" icon={Home} end>
            Dashboard
          </SideLink>

          <SideLink to="/admin/users" icon={Users}>
            Users
          </SideLink>

          <SideLink to="/admin/tools" icon={Box}>
            Tool Submissions
          </SideLink>

          <SideLink to="/admin/stories" icon={BookOpen}>
            Stories
          </SideLink>

          <SideLink to="/admin/messages" icon={MessageSquare}>
            Messages
          </SideLink>

          <SideLink to="/" icon={Home}>
            Back to Site
          </SideLink>

          <SideLink to="/profile" icon={Settings}>
            Profile Settings
          </SideLink>
        </nav>

        <div className="soft-card mt-24 bg-amber-50 p-5 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-100">
            <Check />
          </div>
          <h3 className="mt-4 font-black">Secure. Smart. Simplified.</h3>
          <p className="mt-2 text-sm text-slate-500">
            AI-powered insights for a better campus.
          </p>
        </div>
      </aside>

      <main className="min-w-0">
        <header className="flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-8">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              className="input !py-2 pl-11"
              placeholder="Search anything..."
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white">
              <Bell size={18} />
            </button>

            <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-amber-100 font-black text-amber-600">
              {user?.avatar ? (
                <img
                  src={avatarUrl(user.avatar)}
                  alt={user?.name || "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                user?.name?.[0] || "A"
              )}
            </div>

            <div>
              <b>{user?.name || "Admin User"}</b>
              <p className="text-sm text-slate-500">
                {user?.role === "admin" ? "Admin" : "Member"}
              </p>
            </div>
          </div>
        </header>

        <section className="p-8">
          <Outlet />
        </section>

        <footer className="border-t border-slate-200 bg-white py-4 text-center text-slate-500">
          © 2026 CampusAI. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
