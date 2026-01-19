import { Suspense } from "react";
import ReportLoader from "./ReportLoader";

export default function LandingFixReportPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Generating your report…
        </h1>
        <p className="mt-3 text-gray-600">
          Please keep this tab open. This should take a moment.
        </p>
      </header>

      <Suspense
        fallback={
          <section className="rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
              <p className="text-sm text-gray-700">Loading…</p>
            </div>
          </section>
        }
      >
        <ReportLoader />
      </Suspense>
    </main>
  );
}


