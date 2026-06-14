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
  { id: "firstName", label: "First name", type: "text", placeholder: "Alex", required: true, half: true },
  { id: "lastName", label: "Last name", type: "text", placeholder: "Carter", required: true, half: true },
  { id: "email", label: "Work email", type: "email", placeholder: "alex@company.com", required: true },
  { id: "company", label: "Company name", type: "text", placeholder: "Acme Corp", required: true, half: true },
  { id: "title", label: "Job title", type: "text", placeholder: "VP of Sales", required: true, half: true },
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

  function handleChange(id: string, value: string) {
    setData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => { const e = { ...prev }; delete e[id]; return e; });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Simulate async submission (replace with real API call / Formspree / etc.)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 shadow-float sm:p-10">
        <div className="flex flex-col items-center py-8 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-accent shadow-[0_4px_20px_rgba(43,74,127,0.3)]">
            <IconCheck className="h-8 w-8 text-canvas" />
          </span>
          <h2 className="mt-6 font-display text-display-3 font-bold text-ink">You&apos;re booked in!</h2>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
            Thanks, <strong className="text-ink">{data.firstName}</strong>! We&apos;ve received your request and an ICM specialist will be in touch within one business day to confirm your demo slot.
          </p>

          <div className="mt-8 w-full rounded-xl border border-accent-soft bg-accent-wash/50 p-5 text-left">
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-accent">What happens next</p>
            <ul className="mt-3 space-y-2.5">
              {[
                "You'll get a calendar invite for a 30-min walkthrough",
                "We'll tailor the demo to your team's use case",
                "Come with questions — our specialist will have answers",
              ].map((step) => (
                <li key={step} className="flex items-start gap-2.5 text-[13.5px] text-ink-2">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent">
                    <IconCheck className="h-2.5 w-2.5 text-canvas" />
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="/"
            className="mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent hover:text-accent-600"
          >
            Back to home
            <IconArrow className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-7 shadow-float sm:p-9">
      {/* form header */}
      <div className="mb-7 flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-canvas">
          <IconSpark className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-[20px] font-bold text-ink">Request your demo</h2>
          <p className="mt-0.5 text-[13px] text-muted">Typically responds within 1 business day.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* first/last row */}
        <div className="grid grid-cols-2 gap-4">
          {fields.filter((f) => f.half).map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="mb-1.5 block text-[13px] font-semibold text-ink">
                {f.label} <span className="text-accent">*</span>
              </label>
              <input
                id={f.id}
                type={f.type}
                placeholder={f.placeholder}
                value={data[f.id] ?? ""}
                onChange={(e) => handleChange(f.id, e.target.value)}
                className={[
                  "w-full rounded-xl border px-4 py-2.5 text-[14px] text-ink outline-none transition-all placeholder:text-muted/50",
                  "focus:ring-2 focus:ring-accent/20",
                  errors[f.id]
                    ? "border-red-300 bg-red-50/40 focus:border-red-400"
                    : "border-line bg-canvas focus:border-accent/50",
                ].join(" ")}
              />
              {errors[f.id] ? (
                <p className="mt-1 text-[11.5px] font-medium text-red-500">{errors[f.id]}</p>
              ) : null}
            </div>
          ))}
        </div>

        {/* full-width fields */}
        {fields.filter((f) => !f.half).map((f) => (
          <div key={f.id}>
            <label htmlFor={f.id} className="mb-1.5 block text-[13px] font-semibold text-ink">
              {f.label} <span className="text-accent">*</span>
            </label>
            <input
              id={f.id}
              type={f.type}
              placeholder={f.placeholder}
              value={data[f.id] ?? ""}
              onChange={(e) => handleChange(f.id, e.target.value)}
              className={[
                "w-full rounded-xl border px-4 py-2.5 text-[14px] text-ink outline-none transition-all placeholder:text-muted/50",
                "focus:ring-2 focus:ring-accent/20",
                errors[f.id]
                  ? "border-red-300 bg-red-50/40 focus:border-red-400"
                  : "border-line bg-canvas focus:border-accent/50",
              ].join(" ")}
            />
            {errors[f.id] ? (
              <p className="mt-1 text-[11.5px] font-medium text-red-500">{errors[f.id]}</p>
            ) : null}
          </div>
        ))}

        {/* team size */}
        <div>
          <label htmlFor="teamSize" className="mb-1.5 block text-[13px] font-semibold text-ink">
            Sales team size <span className="text-accent">*</span>
          </label>
          <select
            id="teamSize"
            value={data.teamSize ?? ""}
            onChange={(e) => handleChange("teamSize", e.target.value)}
            className={[
              "w-full appearance-none rounded-xl border px-4 py-2.5 text-[14px] text-ink outline-none transition-all",
              "focus:ring-2 focus:ring-accent/20",
              !data.teamSize ? "text-muted/50" : "",
              errors.teamSize
                ? "border-red-300 bg-red-50/40 focus:border-red-400"
                : "border-line bg-canvas focus:border-accent/50",
            ].join(" ")}
          >
            <option value="" disabled>Select team size…</option>
            {teamSizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.teamSize ? (
            <p className="mt-1 text-[11.5px] font-medium text-red-500">{errors.teamSize}</p>
          ) : null}
        </div>

        {/* optional message */}
        <div>
          <label htmlFor="message" className="mb-1.5 block text-[13px] font-semibold text-ink">
            What are you trying to solve? <span className="text-[12px] font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder="e.g. We're spending 3 days per cycle reconciling comp in spreadsheets and want to automate it on ServiceNow…"
            value={data.message ?? ""}
            onChange={(e) => handleChange("message", e.target.value)}
            className="w-full resize-none rounded-xl border border-line bg-canvas px-4 py-2.5 text-[14px] text-ink outline-none transition-all placeholder:text-muted/50 focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {/* submit */}
        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[0.95rem] font-semibold text-canvas shadow-[0_2px_10px_rgba(15,27,45,0.18)] transition-all duration-300 hover:bg-accent hover:shadow-[0_8px_24px_rgba(43,74,127,0.28)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-canvas/30 border-t-canvas" />
              Sending…
            </>
          ) : (
            <>
              Request your demo
            </>
          )}
        </button>

        <p className="text-center text-[11.5px] text-muted">
          By submitting, you agree to our{" "}
          <a href="#" className="underline hover:text-ink">Privacy policy</a>.
          No spam, ever.
        </p>
      </form>
    </div>
  );
}
