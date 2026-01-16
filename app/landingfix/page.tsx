"use client";

import { useState } from "react";

export default function LandingFix() {
  const [url, setUrl] = useState("");

  return (
    <main style={{ padding: 40, maxWidth: 700 }}>
      <h1>LandingFix</h1>

      <p>
        Get a fast, brutal audit of your landing page.
      </p>

      <input
        type="text"
        placeholder="https://yourlanding.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />

      <button>
        Analyze
      </button>
    </main>
  );
}

