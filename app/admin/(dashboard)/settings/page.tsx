"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/admin/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const DEFAULT_SETTINGS: Record<string, string> = {
  site_name: "IncentIQ",
  site_url: "",
  site_description: "",
  support_email: "",
  twitter_url: "",
  linkedin_url: "",
  footer_text: "",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);

  // Change password state
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handlePwChange(key: string, value: string) {
    setPwForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast({ title: "Error", description: "New passwords do not match." });
      return;
    }
    if (pwForm.newPassword.length < 8) {
      toast({ title: "Error", description: "Password must be at least 8 characters." });
      return;
    }
    setPwSaving(true);
    const res = await fetch("/api/admin/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      toast({ title: "Password changed!", description: "Your password has been updated." });
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      toast({ title: "Error", description: data.error ?? "Failed to change password." });
    }
    setPwSaving(false);
  }

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.ok ? r.json() : {})
      .then((data) => setSettings((prev) => ({ ...prev, ...data })));
  }, []);

  function handleChange(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      toast({ title: "Settings saved!", description: "Your changes have been applied." });
    } else {
      toast({ title: "Error", description: "Failed to save settings." });
    }
    setSaving(false);
  }

  return (
    <div className="flex flex-col">
      <Header title="Settings" />
      <div className="p-6 max-w-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          <section className="rounded-xl border border-gray-200 bg-white p-5 space-y-4 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900">General</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Site Name</Label>
                <Input value={settings.site_name} onChange={(e) => handleChange("site_name", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Site URL</Label>
                <Input value={settings.site_url} onChange={(e) => handleChange("site_url", e.target.value)} placeholder="https://incentnow.com" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Site Description</Label>
              <Textarea value={settings.site_description} onChange={(e) => handleChange("site_description", e.target.value)} rows={2} />
            </div>
            <div className="space-y-1.5">
              <Label>Support Email</Label>
              <Input type="email" value={settings.support_email} onChange={(e) => handleChange("support_email", e.target.value)} />
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 space-y-4 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900">Social Links</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>LinkedIn URL</Label>
                <Input value={settings.linkedin_url} onChange={(e) => handleChange("linkedin_url", e.target.value)} placeholder="https://linkedin.com/company/…" />
              </div>
              <div className="space-y-1.5">
                <Label>Twitter/X URL</Label>
                <Input value={settings.twitter_url} onChange={(e) => handleChange("twitter_url", e.target.value)} placeholder="https://x.com/…" />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 space-y-4 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900">Footer</h2>
            <div className="space-y-1.5">
              <Label>Footer Text</Label>
              <Textarea value={settings.footer_text} onChange={(e) => handleChange("footer_text", e.target.value)} rows={2} placeholder="© 2026 IncentIQ. All rights reserved." />
            </div>
          </section>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[#2B4A7F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1b3a6e] disabled:opacity-60 transition-colors shadow-sm"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Settings
          </button>
        </form>

        {/* Change Password — separate form */}
        <form onSubmit={handleChangePassword} className="mt-6 space-y-6">
          <section className="rounded-xl border border-gray-200 bg-white p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-900">Change Password</h2>
            </div>

            <div className="space-y-1.5">
              <Label>Current Password</Label>
              <div className="relative">
                <Input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter current password"
                  value={pwForm.currentPassword}
                  onChange={(e) => handlePwChange("currentPassword", e.target.value)}
                  className="pr-10"
                  required
                />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>New Password</Label>
                <div className="relative">
                  <Input
                    type={showNew ? "text" : "password"}
                    placeholder="Min 8 characters"
                    value={pwForm.newPassword}
                    onChange={(e) => handlePwChange("newPassword", e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Confirm New Password</Label>
                <div className="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat new password"
                    value={pwForm.confirmPassword}
                    onChange={(e) => handlePwChange("confirmPassword", e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={pwSaving}
              className="flex items-center gap-2 rounded-lg bg-[#2B4A7F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1b3a6e] disabled:opacity-60 transition-colors shadow-sm"
            >
              {pwSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              Update Password
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
