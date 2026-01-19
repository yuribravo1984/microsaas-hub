"use client";

import { useState } from "react";

export default function LandingFixRunPage() {
  const [url, setUrl] = useState("");
  const [businessType, setBusinessType] = useState("SaaS");
  const [goal, setGoal] = useState("Get more signups");
  const [traffic, setTraffic] = useState("Ads");
  const [error, setError] = useState<string | null>(null);

  function isValidUrl(value: string) {
    try {
      const u = new URL(value);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = url.trim();

    if (!isValidUrl(trimmed)) {
      setError("Please enter a valid URL (must start with http:// or https://).");
      return;
    }

    const qs = new URLSearchParams({
      url: trimmed,
      businessType,
      goal,
      traffic,
    });

    // Próximo passo (ainda sem IA): uma página de "gerando relatório"
    window.location.href = `/landingfix/report?${qs.toString()}`;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Run your landing page diagnosis
        </h1>
        <p className="mt-3 text-gray-600">
          Paste your URL and answer a few quick questions. You’ll get a structured
          report you can download as a PDF.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Landing page URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://yourdomain.com"
            className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
          {error ? (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              Tip: use the exact URL you’re driving traffic to.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Business type</label>
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
          >
            <option>SaaS</option>
            <option>E-commerce</option>
            <option>Agency / Services</option>
            <option>Info product</option>
            <option>Mobile app</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Primary goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
          >
            <option>Get more signups</option>
            <option>Book more demos</option>
            <option>Increase purchases</option>
            <option>Collect leads</option>
            <option>Get app installs</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Main traffic source</label>
          <select
            value={traffic}
            onChange={(e) => setTraffic(e.target.value)}
            className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-black"
          >
            <option>Ads</option>
            <option>SEO</option>
            <option>Social</option>
            <option>Email</option>
            <option>Direct / referrals</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-black px-6 py-4 text-white font-medium hover:bg-gray-900 transition"
        >
          Generate my report
        </button>

        <p className="text-center text-sm text-gray-500">
          No calls. No fluff. Just clear guidance.
        </p>
      </form>
    </main>
  );
}




