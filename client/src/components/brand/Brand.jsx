import { GraduationCap } from "lucide-react";

export function BrandLogo({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-sm">
        <GraduationCap size={22} strokeWidth={2.5} />
      </div>
      <div className="text-2xl font-black tracking-[-0.04em]">
        Campus <span className="text-amber-500">AI</span>
      </div>
    </div>
  );
}

export function HeroArt({ variant = "default", className = "" }) {
  return (
    <div className={`hero-art ${className}`}>
      <div className="hero-window" />
      <div className="hero-card-a" />
      <div className="hero-card-b" />
      <div className="hero-card-c" />
      <div className="hero-card-d" />
      <div className="ai-badge">AI</div>
      <div className="cap" />
      <div className="dots one" />
      <div className="dots two" />
      <div className="plus p1">+</div>
      <div className="plus p2">+</div>
      <div className="plus p3">+</div>
      {variant === "people" && (
        <div className="absolute bottom-7 left-[23%] right-[12%] h-24 rounded-t-[80px] bg-slate-200/70 border border-slate-100" />
      )}
    </div>
  );
}

export function Badge({ children }) {
  return <span className="pill">{children}</span>;
}
