export default function LandingFix() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 24px" }}>
      <h1>Your landing page is leaking conversions.</h1>
      <p>
        We analyze your hero section, messaging and structure to show exactly why
        visitors don’t take action.
      </p>

      <a href="#cta">Fix My Landing Page</a>

      <hr style={{ margin: "60px 0" }} />

      <h2>What we grade</h2>
      <ul>
        <li>Hero clarity (first 5 seconds)</li>
        <li>Value proposition</li>
        <li>Call to action</li>
        <li>Visual hierarchy</li>
      </ul>

      <hr style={{ margin: "60px 0" }} />

      <section id="cta">
        <h2>Get an instant landing page grade</h2>
        <a href="/">Run a Free Grade</a>
        <p>One-time payment • Actionable insights</p>
      </section>
    </main>
  );
}



