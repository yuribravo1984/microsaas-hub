export default function LandingFixPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <section className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          Not sure why your landing page isn’t converting?
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Get a structured landing page diagnosis that tells you exactly what to
          fix first — and how to fix it.
        </p>

        <div className="mt-10">
          <a
            href="/landingfix/run"
            className="inline-block rounded-md bg-black px-8 py-4 text-white text-base font-medium hover:bg-gray-900 transition"
          >
            Run the diagnosis
          </a>

          <p className="mt-3 text-sm text-gray-500">Takes ~2 minutes</p>
        </div>
      </section>
    </main>
  );
}



