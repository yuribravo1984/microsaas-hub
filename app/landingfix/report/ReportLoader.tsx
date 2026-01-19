"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ReportLoader() {
  const sp = useSearchParams();

  const payload = useMemo(() => {
    return {
      url: sp.get("url") ?? "",
      businessType: sp.get("businessType") ?? "",
      goal: sp.get("goal") ?? "",
      traffic: sp.get("traffic") ?? "",
    };
  }, [sp]);

  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!payload.url) {
        setStatus("error");
        setError("Missing URL. Please go back and submit the form again.");
        return;
      }

      try {
        const res = await fetch("/api/landingfix/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          throw new Error(`Analyze failed (${res.status}). ${txt}`.trim());
        }

        const data = await res.json();
        const reportId = String(data?.id ?? "");
        const report = data?.report;

        if (!reportId || !report) throw new Error("Invalid report response.");

        localStorage.setItem(
          `landingfix_report_${reportId}`,
          JSON.stringify(report)
        );

        if (!cancelled) {
          window.location.href = `/landingfix/report/${reportId}`;
        }
      } catch (e: any) {
        if (!cancelled) {
          setStatus("error");
          setError(e?.message ?? "Something went wrong.");
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [payload]);

  return (
    <section className="rounded-lg border border-gray-200 p-6">
      {status === "loading" && (
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
          <p className="text-sm text-gray-700">Analyzing…</p>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-3">
          <p className="text-sm text-red-600">{error}</p>
          <a
            href="/landingfix/run"
            className="inline-block rounded-md border border-gray-300 px-4 py-2 text-sm hover:border-black transition"
          >
            Back to form
          </a>
        </div>
      )}

      <div className="mt-6 space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-medium">URL:</span>{" "}
          <span className="break-all">{payload.url || "(missing)"}</span>
        </p>
        <p>
          <span className="font-medium">Business type:</span>{" "}
          {payload.businessType || "(missing)"}
        </p>
        <p>
          <span className="font-medium">Goal:</span> {payload.goal || "(missing)"}
        </p>
        <p>
          <span className="font-medium">Traffic:</span>{" "}
          {payload.traffic || "(missing)"}
        </p>
      </div>
    </section>
  );
}

