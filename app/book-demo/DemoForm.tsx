"use client";

import { useState } from "react";
import { IconArrow, IconCheck, IconSpark } from "@/components/ui/icons";

type Field = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  half?: boolean;
};

const fields: Field[] = [
  { id: "firstName", label: "First name", type: "text", placeholder: "", required: true, half: true },
  { id: "lastName", label: "Last name", type: "text", placeholder: "", required: true, half: true },
  { id: "email", label: "Work email", type: "email", placeholder: "", required: true },
  { id: "company", label: "Company name", type: "text", placeholder: "", required: true, half: true },
  { id: "title", label: "Job title", type: "text", placeholder: "", required: true, half: true },
];

const teamSizes = [
  "1–10 reps",
  "11–50 reps",
  "51–200 reps",
  "201–500 reps",
  "500+ reps",
];

type FormData = Record<string, string>;
type FormErrors = Record<string, string>;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.firstName?.trim()) errors.firstName = "Required";
  if (!data.lastName?.trim()) errors.lastName = "Required";
  if (!data.email?.trim()) {
    errors.email = "Required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid work email";
  }
  if (!data.company?.trim()) errors.company = "Required";
  if (!data.title?.trim()) errors.title = "Required";
  if (!data.teamSize) errors.teamSize = "Please select a team size";
  return errors;
}

export function DemoForm() {
  const [data, setData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teamSizeOpen, setTeamSizeOpen] = useState(false);

  function handleChange(id: string, value: string) {
    setData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => { const e = { ...prev }; delete e[id]; return e; });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          company: data.company,
          jobTitle: data.title,
          companySize: data.teamSize,
          message: data.message,
          source: "website",
        }),
      });
      if (!res.ok) throw new Error("Failed");

      fetch("/api/send-demo-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          company: data.company,
          jobTitle: data.title,
          companySize: data.teamSize,
          message: data.message,
        }),
      }).catch(() => {});

      setSubmitted(true);
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-light-gray bg-white p-8 shadow-float sm:p-10">
        <div className="flex flex-col items-center py-8 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-green shadow-[0_4px_20px_rgba(0,166,81,0.3)]">
            <IconCheck className="h-8 w-8 text-white" />
          </span>
          <h2 className="mt-6 font-display text-display-3 font-bold text-dark-green">You&apos;re booked in!</h2>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-slate">
            Thanks, <strong className="text-dark-green">{data.firstName}</strong>! We&apos;ve received your request and an ICM specialist will be in touch within one business day to confirm your demo slot.
          </p>

          <div className="mt-8 w-full rounded-xl border border-light-green bg-light-green/50 p-5 text-left">
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-green">What happens next</p>
            <ul className="mt-3 space-y-2.5">
              {[
                "You'll get a calendar invite for a 30-min walkthrough",
                "We'll tailor the demo to your team's use case",
                "Come with questions — our specialist will have answers",
              ].map((step) => (
                <li key={step} className="flex items-start gap-2.5 text-[13.5px] text-navy">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-green">
                    <IconCheck className="h-2.5 w-2.5 text-white" />
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="/"
            className="mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-green hover:text-dark-green"
          >
            Back to home
            <IconArrow className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-light-gray bg-white p-7 shadow-float sm:p-9">
      {/* form header */}
      <div className="mb-7 flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green text-white">
          <IconSpark className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-[20px] font-bold text-dark-green">Request your demo</h2>
          <p className="mt-0.5 text-[13px] text-slate">Typically responds within 1 business day.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* first/last row */}
        <div className="grid grid-cols-2 gap-4">
          {fields.filter((f) => f.half).map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="mb-1.5 block text-[13px] font-semibold text-dark-green">
                {f.label} <span className="text-green">*</span>
              </label>
              <input
                id={f.id}
                type={f.type}
                placeholder={f.placeholder}
                value={data[f.id] ?? ""}
                onChange={(e) => handleChange(f.id, e.target.value)}
                className={[
                  "w-full rounded-xl border px-4 py-2.5 text-[14px] text-dark-green outline-none transition-all placeholder:text-slate/50",
                  "focus:ring-2 focus:ring-green/20",
                  errors[f.id]
                    ? "border-red/30 bg-red/10/40 focus:border-red/40"
                    : "border-[#D1D5DB] bg-[#F8FAFC] focus:border-green/50",
                ].join(" ")}
              />
              {errors[f.id] ? (
                <p className="mt-1 text-[11.5px] font-medium text-red">{errors[f.id]}</p>
              ) : null}
            </div>
          ))}
        </div>

        {/* full-width fields */}
        {fields.filter((f) => !f.half).map((f) => (
          <div key={f.id}>
            <label htmlFor={f.id} className="mb-1.5 block text-[13px] font-semibold text-dark-green">
              {f.label} <span className="text-green">*</span>
            </label>
            <input
              id={f.id}
              type={f.type}
              placeholder={f.placeholder}
              value={data[f.id] ?? ""}
              onChange={(e) => handleChange(f.id, e.target.value)}
              className={[
                "w-full rounded-xl border px-4 py-2.5 text-[14px] text-dark-green outline-none transition-all placeholder:text-slate/50",
                "focus:ring-2 focus:ring-green/20",
                errors[f.id]
                  ? "border-red/30 bg-red/10/40 focus:border-red/40"
                  : "border-[#D1D5DB] bg-[#F8FAFC] focus:border-green/50",
              ].join(" ")}
            />
            {errors[f.id] ? (
              <p className="mt-1 text-[11.5px] font-medium text-red">{errors[f.id]}</p>
            ) : null}
          </div>
        ))}

        {/* team size — custom dropdown */}
        <div className="relative">
          <label className="mb-1.5 block text-[13px] font-semibold text-dark-green">
            Sales team size <span className="text-green">*</span>
          </label>

          {/* invisible overlay to close on outside click */}
          {teamSizeOpen && (
            <div className="fixed inset-0 z-10" onClick={() => setTeamSizeOpen(false)} />
          )}

          <button
            type="button"
            onClick={() => setTeamSizeOpen((o) => !o)}
            className={[
              "relative z-20 flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-[14px] text-left outline-none transition-all",
              "focus:ring-2 focus:ring-green/20",
              errors.teamSize
                ? "border-red/30 bg-[#FEF2F2] text-red/70"
                : "border-[#D1D5DB] bg-[#F8FAFC] focus:border-green/50",
              !data.teamSize ? "text-slate/50" : "text-dark-green",
            ].join(" ")}
          >
            <span>{data.teamSize || "Select team size"}</span>
            <svg
              className={`h-4 w-4 shrink-0 text-slate transition-transform duration-150 ${teamSizeOpen ? "rotate-180" : ""}`}
              viewBox="0 0 20 20" fill="currentColor" aria-hidden
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {teamSizeOpen && (
            <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-[#D1D5DB] bg-white shadow-lg">
              {teamSizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { handleChange("teamSize", s); setTeamSizeOpen(false); }}
                  className="block w-full px-4 py-2.5 text-left text-[14px] text-dark-green transition-colors hover:bg-light-green hover:text-green"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {errors.teamSize ? (
            <p className="mt-1 text-[11.5px] font-medium text-red">{errors.teamSize}</p>
          ) : null}
        </div>

        {/* optional message */}
        <div>
          <label htmlFor="message" className="mb-1.5 block text-[13px] font-semibold text-dark-green">
            What are you trying to solve? <span className="text-[12px] font-normal text-slate">(optional)</span>
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder=""
            value={data.message ?? ""}
            onChange={(e) => handleChange("message", e.target.value)}
            className="w-full resize-none rounded-xl border border-[#D1D5DB] bg-[#F8FAFC] px-4 py-2.5 text-[14px] text-dark-green outline-none transition-all placeholder:text-slate/50 focus:border-green/50 focus:ring-2 focus:ring-green/20"
          />
        </div>

        {/* submit */}
        <button
          type="submit"
          disabled={loading}
          style={{ backgroundColor: "#00A651", color: "#FFFFFF" }}
          className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#00A651] px-6 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_2px_10px_rgba(15,46,36,0.18)] transition-all duration-300 hover:bg-[#0F2E24] hover:shadow-[0_10px_28px_rgba(0,166,81,0.30)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Sending…
            </>
          ) : (
            <>
              Request your demo
            </>
          )}
        </button>

        <p className="text-center text-[11.5px] text-slate">
          By submitting, you agree to our{" "}
          <a href="#" className="underline hover:text-dark-green">Privacy policy</a>.
          No spam, ever.
        </p>
      </form>
    </div>
  );
}
