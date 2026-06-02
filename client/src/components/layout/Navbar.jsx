import { Link, NavLink } from "react-router-dom";
import {
  Bell,
  LogOut,
  UserRound,
  ArrowRight,
  Plus,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { apiBase } from "../../api/axios";
import { BrandLogo } from "../brand/Brand";

function avatarUrl(path) {
  if (!path) return "";
  return path.startsWith("http") ? path : `${apiBase}${path}`;
}

const nav = [
  ["/", "Home"],
  ["/about", "About"],
  ["/tools", "AI Tools"],
  ["/stories", "Stories"],
  ["/contact", "Contact"],
];

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="page-wrap flex h-[72px] items-center justify-between gap-5">
        <Link to="/" aria-label="CampusAI home">
          <BrandLogo />
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary navigation"
        >
          {nav.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative py-6 text-[15px] font-extrabold ${isActive ? "text-black after:absolute after:bottom-3 after:left-0 after:h-[3px] after:w-full after:rounded after:bg-amber-500" : "text-slate-700 hover:text-black"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/contribute"
                className="hidden md:inline-flex btn-primary !py-2.5"
              >
                <Plus size={18} /> Contribute
              </Link>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="hidden md:inline-flex btn-outline !py-2.5"
                >
                  <LayoutDashboard size={18} /> Admin
                </Link>
              )}
              <button
                type="button"
                className="relative grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white"
                aria-label="Notifications"
              >
                <Bell size={20} />
              </button>
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 hover:border-amber-400"
                aria-label="Open profile"
              >
                <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-amber-100 font-black text-amber-600">
                  {user.avatar ? (
                    <img
                      src={avatarUrl(user.avatar)}
                      alt={user.name || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user.name?.[0] || "U"
                  )}
                </span>
                <span className="hidden text-left md:block">
                  <span className="block text-sm font-extrabold">
                    {user.name || "Member"}
                  </span>
                  <span className="block text-xs text-slate-500">
                    {user.role === "admin" ? "Admin" : "Member"}
                  </span>
                </span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white hover:border-red-300 hover:text-red-600"
                aria-label="Log out"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn-outline !px-5 !py-2.5">
                <UserRound size={18} /> Sign In
              </Link>
              <Link to="/signup" className="btn-primary !px-5 !py-2.5">
                Sign Up <ArrowRight size={18} />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
