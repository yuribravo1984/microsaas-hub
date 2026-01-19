"use client";

import { useEffect, useMemo, useState } from "react";

type Report = any;

export default function LandingFixReportPage({
  params,
}: {
  params: { id: string };
}) {
  const reportId = params.id;

  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(`landingfix_report_${reportId}`);
    if (!raw) return;
    try {
      setReport(JSON.parse(raw));
    } catch {
      setReport(null);
    }
  }, [reportId]);

  const meta = report?.meta;
  const score = report?.score;

  const inputUrl = useMemo(() => meta?.input?.url ?? "", [meta]);

  if (!report) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">Report not found</h1>
        <p className="mt-3 text-gray-600">
          This report was not found in your browser storage. Please run a new diagnosis.
        </p>
        <div className="mt-6">
          <a
            href="/landingfix/run"
            className="inline-block rounded-md bg-black px-6 py-3 text-white font-medium hover:bg-gray-900 transition"
          >
            Run the diagnosis
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          LandingFix Report
        </h1>
        <p className="mt-3 text-gray-600">
          URL: <span className="break-all">{inputUrl}</span>
        </p>

        <div className="mt-6 flex gap-3">
          <a
            href="/landingfix/run"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:border-black transition"
          >
            Run another
          </a>

          {/* PDF entra no passo 06. Por enquanto é um placeholder */}
          <button
            onClick={() => alert("PDF download will be added in a later step.")}
            className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-900 transition"
          >
            Download PDF
          </button>
        </div>
      </header>

      {/* A) Strengths */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">What you’re already doing well</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
          {report.strengths?.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      {/* B) Main issue */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">
          The main thing limiting conversion today
        </h2>
        <p className="mt-4 text-gray-700">
          <span className="font-medium">{report.mainIssue?.title}:</span>{" "}
          {report.mainIssue?.explanation}
        </p>
      </section>

      {/* C) Fix playbook */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">How to fix it (step-by-step)</h2>
        <p className="mt-4 text-gray-700">
          <span className="font-medium">Objective:</span>{" "}
          {report.fixPlaybook?.objective}
        </p>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-900">Checklist</h3>
          <ul className="mt-3 space-y-2">
            {report.fixPlaybook?.checklist?.map((step: string, i: number) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <span className="mt-1 inline-block h-4 w-4 rounded border border-gray-300" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-900">
            Ready-to-use examples
          </h3>

          <div className="mt-3 rounded-lg border border-gray-200 p-4">
            <p className="text-sm font-medium">Headline ideas</p>
            <ul className="mt-2 list-disc pl-6 text-gray-700">
              {report.fixPlaybook?.copyExamples?.headlines?.map(
                (x: string, i: number) => <li key={i}>{x}</li>
              )}
            </ul>

            <p className="mt-4 text-sm font-medium">CTA ideas</p>
            <ul className="mt-2 list-disc pl-6 text-gray-700">
              {report.fixPlaybook?.copyExamples?.ctas?.map(
                (x: string, i: number) => <li key={i}>{x}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-900">Quick validation</h3>
          <ul className="mt-2 list-disc pl-6 text-gray-700">
            {report.fixPlaybook?.quickValidation?.map((x: string, i: number) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* D) Secondary issues */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Secondary adjustments</h2>
        <div className="mt-4 space-y-6">
          {report.secondaryIssues?.map((it: any, i: number) => (
            <div key={i} className="rounded-lg border border-gray-200 p-4">
              <p className="font-medium">{it.title}</p>
              <ul className="mt-2 list-disc pl-6 text-gray-700">
                {it.howTo?.map((x: string, j: number) => <li key={j}>{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* E) Visual identity */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Visual identity</h2>
        <p className="mt-4 text-gray-700">{report.visualIdentity?.whatLooksGood}</p>

        <div className="mt-4 rounded-lg border border-gray-200 p-4">
          <p className="font-medium">{report.visualIdentity?.oneHighImpactImprovement?.title}</p>
          <ul className="mt-2 list-disc pl-6 text-gray-700">
            {report.visualIdentity?.oneHighImpactImprovement?.steps?.map(
              (x: string, i: number) => <li key={i}>{x}</li>
            )}
          </ul>
        </div>
      </section>

      {/* F) Silent intelligence */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">A quick outside perspective</h2>
        <p className="mt-4 text-gray-700">{report.silentIntelligence?.benchmark}</p>
        <p className="mt-3 text-gray-700">{report.silentIntelligence?.visitorSimulation}</p>
      </section>

      {/* G) Score */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Heuristic score</h2>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Clarity</p>
            <p className="mt-1 text-2xl font-semibold">{score?.clarity ?? "-"}/10</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Focus</p>
            <p className="mt-1 text-2xl font-semibold">{score?.focus ?? "-"}/10</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Trust</p>
            <p className="mt-1 text-2xl font-semibold">{score?.trust ?? "-"}/10</p>
          </div>
        </div>
      </section>

      {/* Follow-up */}
      <section className="rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold">{report.followUp?.title}</h2>
        <p className="mt-3 text-gray-700">{report.followUp?.text}</p>
        <div className="mt-5">
          <a
            href="/landingfix/followup"
            className="inline-block rounded-md border border-gray-300 px-4 py-2 text-sm hover:border-black transition"
          >
            Run a follow-up review
          </a>
        </div>
      </section>
    </main>
  );
}

