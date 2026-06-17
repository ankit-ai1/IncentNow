"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { Eye, EyeOff, Loader2, ShieldCheck, TrendingUp, BarChart3, Zap } from "lucide-react";
import Link from "next/link";
import { LogoMark } from "@/components/ui/Logo";

const REMEMBER_KEY = "incentnow_admin_email";

const FEATURES = [
  { icon: TrendingUp,  text: "Real-time incentive analytics" },
  { icon: BarChart3,   text: "AI-powered comp forecasting" },
  { icon: ShieldCheck, text: "Enterprise-grade governance" },
  { icon: Zap,         text: "Built natively on ServiceNow" },
];

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe]     = useState(false);
  const [error, setError]               = useState("");

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } =
    useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    const saved = localStorage.getItem(REMEMBER_KEY);
    if (saved) { setValue("email", saved); setRememberMe(true); }
  }, [setValue]);

  async function onSubmit(data: LoginInput) {
    setError("");
    rememberMe
      ? localStorage.setItem(REMEMBER_KEY, data.email)
      : localStorage.removeItem(REMEMBER_KEY);

    const result = await signIn("credentials", {
      email: data.email, password: data.password, redirect: false,
    });

    if (result?.error) setError("Invalid email or password. Please try again.");
    else { router.push("/admin"); router.refresh(); }
  }

  return (
    <div className="mesh grain min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="lg:grid lg:grid-cols-[1fr_420px] lg:gap-20 lg:items-center">

          {/* ── LEFT — brand ── */}
          <div className="hidden lg:block">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <LogoMark className="h-8 w-auto" />
              <span className="font-display text-[17px] font-extrabold tracking-tight text-ink">
                Incent<span className="text-accent">IQ</span>
              </span>
              <span className="ml-1 rounded-md bg-accent/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">
                Admin
              </span>
            </div>

            {/* Hero copy */}
            <div className="space-y-4">
              <span className="eyebrow">Admin Portal</span>
              <h1 className="font-display text-display-3 font-bold text-ink text-balance">
                Incentive intelligence,{" "}
                <span className="text-gradient">fully in command.</span>
              </h1>
              <p className="text-lead text-muted text-pretty max-w-sm">
                Manage your compensation content, demo pipeline, and platform settings — all from one secure workspace.
              </p>
            </div>

            {/* Feature list */}
            <ul className="mt-9 space-y-3.5">
              {FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft ring-1 ring-accent/10">
                    <Icon className="h-4 w-4 text-accent" />
                  </span>
                  <span className="text-[14px] font-medium text-ink-2">{text}</span>
                </li>
              ))}
            </ul>

            {/* Security badge */}
            <div className="mt-10">
              <div className="inline-flex items-center gap-2.5 rounded-xl border border-line bg-panel px-4 py-2.5 shadow-soft">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span className="text-[12px] text-muted">
                  SOC 2 compliant · End-to-end encrypted · Enterprise SSO ready
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT — form ── */}
          <div>
            {/* Mobile logo */}
            <div className="lg:hidden mb-8 flex items-center justify-center gap-2.5">
              <LogoMark className="h-8 w-auto" />
              <span className="font-display text-lg font-extrabold tracking-tight text-ink">
                Incent<span className="text-accent">IQ</span>
              </span>
            </div>

            {/* Card */}
            <div className="card p-8">
              <div className="mb-7">
                <h2 className="font-display text-[1.45rem] font-bold text-ink">Welcome back</h2>
                <p className="mt-1.5 text-sm text-muted">Sign in to your admin workspace</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

                {/* Error banner */}
                {error && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                    <p className="text-[13px] leading-snug text-red-700">{error}</p>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-[13px] font-semibold text-ink-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@company.com"
                    {...register("email")}
                    className="block w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder-muted/50 outline-none transition-all duration-200 focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                  />
                  {errors.email && (
                    <p className="text-[12px] text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-[13px] font-semibold text-ink-2">
                      Password
                    </label>
                    <Link
                      href="/admin/forgot-password"
                      className="text-[12px] font-semibold text-accent transition-colors hover:text-accent-600"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••••"
                      {...register("password")}
                      className="block w-full rounded-xl border border-line bg-surface px-4 py-2.5 pr-11 text-sm text-ink placeholder-muted/50 outline-none transition-all duration-200 focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-ink-2"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[12px] text-red-600">{errors.password.message}</p>
                  )}
                </div>

                {/* Remember me */}
                <label className="flex cursor-pointer select-none items-center gap-3">
                  <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-line bg-surface transition-all checked:border-accent checked:bg-accent"
                    />
                    <svg
                      className="pointer-events-none absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                      viewBox="0 0 12 12" fill="none"
                    >
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-[13px] text-muted">Remember me for 30 days</span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3 text-sm font-semibold text-canvas shadow-[0_2px_10px_rgba(15,27,45,0.18)] transition-all duration-300 hover:bg-accent hover:shadow-[0_8px_24px_rgba(43,74,127,0.28)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</>
                    : "Sign in to Dashboard"
                  }
                </button>

              </form>
            </div>

            <p className="mt-5 text-center text-[12px] text-muted">
              Protected by IncentIQ security · All sessions are encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
