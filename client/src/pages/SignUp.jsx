import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Home,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserRound,
  Send,
  BookOpen,
  Users,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { BrandLogo, Badge, HeroArt } from "../components/brand/Brand";
import Footer from "../components/layout/Footer";

const benefits = [
  [
    Send,
    "Submit AI Tools",
    "Share and showcase innovative AI tools used across campuses.",
  ],
  [
    BookOpen,
    "Share Campus Stories",
    "Inspire others by sharing real stories of learning, teaching, and impact.",
  ],
  [
    Users,
    "Join the Community",
    "Connect with educators, students, and innovators building the future together.",
  ],
];

export default function SignUp() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");

    if (form.password !== form.confirm) {
      setErr("Passwords do not match");
      return;
    }

    try {
      await register(form.name, form.email, form.password);
      nav("/my-contributions");
    } catch (ex) {
      setErr(ex.response?.data?.message || "Registration failed");
    }
  }

  const fields = [
    ["name", "Full Name", "Enter your full name", UserRound, "text"],
    ["email", "Email", "Enter your email address", Mail, "email"],
    [
      "password",
      "Password",
      "Create a password",
      Lock,
      showPassword ? "text" : "password",
    ],
    [
      "confirm",
      "Confirm Password",
      "Confirm your password",
      Lock,
      showConfirm ? "text" : "password",
    ],
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200">
        <div className="page-wrap flex h-[78px] items-center justify-between">
          <BrandLogo />
          <Link to="/" className="flex items-center gap-2 font-black">
            <Home size={18} /> Back to Home
          </Link>
        </div>
      </header>

      <main className="page-wrap grid min-h-[720px] items-center gap-12 py-10 lg:grid-cols-[1fr_.82fr]">
        <section>
          <Badge>AI for Every Campus</Badge>
          <h1 className="display-title mt-5">
            Join CampusAI and Shape the Future of{" "}
            <span className="text-amber-500">Education</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Create an account to explore powerful AI tools, share campus
            stories, and connect with a community of forward-thinkers driving
            innovation in education.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-[260px_1fr]">
            <div className="space-y-8">
              {benefits.map(([Icon, title, description]) => (
                <div className="flex items-start gap-5" key={title}>
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-500">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-black leading-tight">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <HeroArt className="min-h-[340px]" />
          </div>
        </section>

        <section className="soft-card mx-auto w-full max-w-[520px] p-10">
          <h2 className="text-4xl font-black tracking-[-.04em]">
            Create Your Account
          </h2>
          <p className="mt-2 text-slate-500">
            Sign up to get started with CampusAI
          </p>

          {err && (
            <div className="mt-5 rounded-lg bg-red-50 p-3 text-red-700">
              {err}
            </div>
          )}

          <form onSubmit={submit} className="mt-7 space-y-5">
            {fields.map(([key, label, placeholder, Icon, type]) => (
              <label key={key}>
                <span className="label">{label}</span>
                <div className="relative">
                  <Icon
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={20}
                  />
                  <input
                    className="input pl-12 pr-12"
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    required
                  />

                  {key === "password" && (
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-black"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  )}

                  {key === "confirm" && (
                    <button
                      type="button"
                      onClick={() => setShowConfirm((value) => !value)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-black"
                      aria-label={
                        showConfirm
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirm ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  )}
                </div>

                {key === "password" && (
                  <span className="mt-1 block text-sm text-slate-500">
                    Use 8+ characters with a mix of letters, numbers & symbols
                  </span>
                )}
              </label>
            ))}

            <label className="flex gap-3 text-sm text-slate-600">
              <input type="checkbox" required />
              <span>
                I agree to the{" "}
                <span className="font-black text-amber-500">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="font-black text-amber-500">
                  Privacy Policy
                </span>
              </span>
            </label>

            <button className="btn-primary w-full text-lg">
              Sign Up <ArrowRight />
            </button>
          </form>

          <div className="my-6 flex items-center gap-5 text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            or
            <span className="h-px flex-1 bg-slate-200" />
          </div>
          <p className="text-center text-slate-500">
            Already have an account?{" "}
            <Link className="font-black text-amber-500" to="/signin">
              Sign In
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
