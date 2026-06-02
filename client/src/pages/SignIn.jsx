import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Home, Mail, Lock, EyeOff, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { BrandLogo, Badge, HeroArt } from "../components/brand/Brand";
import Footer from "../components/layout/Footer";

export default function SignIn() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      nav("/my-contributions");
    } catch (ex) {
      setErr(ex.response?.data?.message || "Login failed");
    }
  }
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200">
        <div className="page-wrap flex h-[78px] items-center justify-between">
          <BrandLogo />
          <Link to="/" className="flex items-center gap-2 font-black">
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </header>
      <main className="page-wrap grid min-h-[720px] items-center gap-12 py-10 lg:grid-cols-[1fr_.82fr]">
        <section>
          <Badge>AI for Every Campus</Badge>
          <h1 className="display-title mt-5">
            Smarter Education Starts{" "}
            <span className="text-amber-500">Here.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Sign in to access powerful AI tools, real campus stories, and a
            community shaping the future of education.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start">
            <img
              src="/images/signIn.png"
              alt="Campus AI learning illustration"
              className="w-full max-w-[680px] object-contain"
            />
          </div>
        </section>
        <section className="soft-card mx-auto w-full max-w-[520px] p-10">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-amber-500">
            <UserRound size={30} />
          </div>
          <h2 className="mt-6 text-center text-4xl font-black tracking-[-.04em]">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-slate-500">
            Sign in to your account to continue
          </p>
          {err && (
            <div className="mt-5 rounded-lg bg-red-50 p-3 text-red-700">
              {err}
            </div>
          )}
          <form onSubmit={submit} className="mt-8 space-y-6">
            <label>
              <span className="label">Email</span>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={20}
                />
                <input
                  className="input pl-12"
                  type="email"
                  placeholder="you@example.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>
            <label>
              <span className="label">Password</span>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={20}
                />
                <input
                  className="input pl-12 pr-12"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <EyeOff
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={20}
                />
              </div>
            </label>
            <div className="flex justify-between text-sm">
              <label className="flex gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <a className="font-black text-amber-500">Forgot Password?</a>
            </div>
            <button className="btn-primary w-full text-lg">
              Sign In <ArrowRight />
            </button>
          </form>
          <div className="my-8 flex items-center gap-5 text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            or
            <span className="h-px flex-1 bg-slate-200" />
          </div>
          <p className="text-center text-slate-600">
            New to CampusAI? Join the community today.
          </p>
          <Link to="/signup" className="btn-outline mt-5 w-full">
            <UserRound size={18} />
            Sign Up <ArrowRight className="ml-auto" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
