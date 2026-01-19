type SearchParams = {
  url?: string;
  businessType?: string;
  goal?: string;
  traffic?: string;
};

export default function LandingFixReportLoadingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const url = searchParams.url ?? "";
  const businessType = searchParams.businessType ?? "";
  const goal = searchParams.goal ?? "";
  const traffic = searchParams.traffic ?? "";

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Generating your report…
        </h1>
        <p className="mt-3 text-gray-600">
          This is the report generation screen. In the next step, we’ll connect the
          AI engine and generate a real report + PDF.
        </p>
      </header>

      <section className="rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
          <p className="text-sm text-gray-700">
            Preparing inputs…
          </p>
        </div>

        <div className="mt-6 space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-medium">URL:</span>{" "}
            {url ? (
              <span className="break-all">{url}</span>
            ) : (
              <span className="text-gray-400">(missing)</span>
            )}
          </p>
          <p>
            <span className="font-medium">Business type:</span>{" "}
            {businessType || <span className="text-gray-400">(missing)</span>}
          </p>
          <p>
            <span className="font-medium">Goal:</span>{" "}
            {goal || <span className="text-gray-400">(missing)</span>}
          </p>
          <p>
            <span className="font-medium">Traffic:</span>{" "}
            {traffic || <span className="text-gray-400">(missing)</span>}
          </p>
        </div>

        <div className="mt-6">
          <a
            href="/landingfix/run"
            className="inline-block rounded-md border border-gray-300 px-4 py-2 text-sm hover:border-black transition"
          >
            Back to form
          </a>
        </div>
      </section>
    </main>
  );
}
