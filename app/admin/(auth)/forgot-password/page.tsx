"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, CheckCircle2, ArrowLeft, KeyRound } from "lucide-react";
import Link from "next/link";
import { LogoMark } from "@/components/ui/Logo";

const schema = z
  .object({
    email:           z.string().email("Invalid email address"),
    newPassword:     z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormInput = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone]               = useState(false);
  const [error, setError]             = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormInput>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormInput) {
    setError("");
    const res = await fetch("/api/admin/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, newPassword: data.newPassword }),
    });
    if (res.ok) {
      setDone(true);
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="mesh grain min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">

        {/* Logo */}
        <div className="mb-8 flex items-center gap-2.5">
          <LogoMark className="h-8 w-auto" />
          <span className="font-display text-lg font-extrabold tracking-tight text-ink">
            Incent<span className="text-accent">IQ</span>
          </span>
        </div>

        <div className="card">
          {done ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center gap-5 p-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 ring-2 ring-emerald-100">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="space-y-1.5">
                <h2 className="font-display text-xl font-bold text-ink">Password updated!</h2>
                <p className="text-sm text-muted">
                  Your password has been reset. You can now sign in with your new credentials.
                </p>
              </div>
              <Link
                href="/admin/login"
                className="mt-2 flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-canvas shadow-[0_2px_10px_rgba(15,27,45,0.18)] transition-all duration-300 hover:bg-accent hover:shadow-[0_8px_24px_rgba(43,74,127,0.28)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
              </Link>
            </div>
          ) : (
            /* ── Form ── */
            <div className="p-8">
              {/* Header */}
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft ring-1 ring-accent/10">
                  <KeyRound className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-ink">Reset password</h2>
                  <p className="mt-0.5 text-[13px] text-muted">Enter your email and choose a new password</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

                {error && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                    <p className="text-[13px] leading-snug text-red-700">{error}</p>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-[13px] font-semibold text-ink-2">
                    Registered email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@company.com"
                    {...register("email")}
                    className="block w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder-muted/50 outline-none transition-all focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                  />
                  {errors.email && <p className="text-[12px] text-red-600">{errors.email.message}</p>}
                </div>

                {/* New password */}
                <div className="space-y-1.5">
                  <label htmlFor="newPassword" className="block text-[13px] font-semibold text-ink-2">
                    New password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showNew ? "text" : "password"}
                      placeholder="Min 8 characters"
                      {...register("newPassword")}
                      className="block w-full rounded-xl border border-line bg-surface px-4 py-2.5 pr-11 text-sm text-ink placeholder-muted/50 outline-none transition-all focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                    />
                    <button type="button" tabIndex={-1} onClick={() => setShowNew(!showNew)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink-2 transition-colors">
                      {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.newPassword && <p className="text-[12px] text-red-600">{errors.newPassword.message}</p>}
                </div>

                {/* Confirm password */}
                <div className="space-y-1.5">
                  <label htmlFor="confirmPassword" className="block text-[13px] font-semibold text-ink-2">
                    Confirm new password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Repeat password"
                      {...register("confirmPassword")}
                      className="block w-full rounded-xl border border-line bg-surface px-4 py-2.5 pr-11 text-sm text-ink placeholder-muted/50 outline-none transition-all focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                    />
                    <button type="button" tabIndex={-1} onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink-2 transition-colors">
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-[12px] text-red-600">{errors.confirmPassword.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3 text-sm font-semibold text-canvas shadow-[0_2px_10px_rgba(15,27,45,0.18)] transition-all duration-300 hover:bg-accent hover:shadow-[0_8px_24px_rgba(43,74,127,0.28)] disabled:opacity-50"
                >
                  {isSubmitting
                    ? <><Loader2 className="h-4 w-4 animate-spin" /> Updating password…</>
                    : "Reset password"
                  }
                </button>

                <p className="text-center text-[12.5px] text-muted">
                  Remembered it?{" "}
                  <Link href="/admin/login" className="font-semibold text-accent transition-colors hover:text-accent-600">
                    Back to sign in
                  </Link>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
