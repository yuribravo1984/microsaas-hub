import type { NextApiRequest, NextApiResponse } from "next";

function makeId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  ).toUpperCase();
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const url = String(req.body?.url ?? "");
  const businessType = String(req.body?.businessType ?? "");
  const goal = String(req.body?.goal ?? "");
  const traffic = String(req.body?.traffic ?? "");

  const id = makeId();

  const report = {
    meta: {
      id,
      createdAt: new Date().toISOString(),
      input: { url, businessType, goal, traffic },
      version: "v1-mock",
    },
    strengths: [
      "Your CTA intent is clear (you are asking the visitor to take one main action).",
      "The page appears to be focused on a single goal (which is already better than most).",
    ],
    mainIssue: {
      title: "Message clarity under time pressure",
      explanation:
        "A first-time visitor should understand what you do and who it’s for within ~3 seconds. Right now, the top section likely leaves too much interpretation, which causes hesitation and drop-off.",
    },
    fixPlaybook: {
      objective:
        "Make the first screen instantly answer: what this is, who it’s for, and why it matters.",
      checklist: [
        "Write a one-sentence description of the product in plain language (no jargon).",
        "Rewrite the headline to include: audience + outcome.",
        "Rewrite the subheadline to explain how you deliver that outcome.",
        "Ensure there is ONE primary CTA above the fold (no competing actions).",
        "Add one credibility element near the CTA (logo, number, short proof line).",
        "Remove or demote anything above the fold that doesn’t support the main action.",
        "Do a 3-second test: show the hero to someone cold and ask what you sell.",
        "If they can’t answer clearly, simplify and repeat.",
      ],
      copyExamples: {
        headlines: [
          "Get {Outcome} without {Common Pain} — built for {Audience}",
          "{Audience}: improve {Key Metric} with a landing that’s instantly clear",
          "Turn clicks into {Primary Action} with a clearer first screen",
        ],
        ctas: ["Run the diagnosis", "Get my report", "See what to fix first"],
      },
      commonMistakes: [
        "Headline describes features instead of the outcome.",
        "Multiple CTAs compete (Demo + Start + Contact all above the fold).",
        "Proof is placed too far down the page.",
      ],
      quickValidation: [
        "Can a cold visitor explain what you do in one sentence?",
        "Is the CTA the most visually dominant element above the fold?",
        "Is there at least one proof element near the CTA?",
      ],
    },
    secondaryIssues: [
      {
        title: "CTA specificity",
        howTo: [
          "Use a CTA that matches the user’s mental step (e.g., 'Get my report').",
          "Avoid generic CTAs like 'Submit' or 'Learn more' as the primary button.",
          "Keep secondary CTAs as links, not buttons.",
        ],
      },
      {
        title: "Proof placement",
        howTo: [
          "Move one proof element to the hero area (logo line or a short metric).",
          "Use one sentence that reduces risk: 'Used by X teams' or 'X+ pages reviewed'.",
          "If you have none, start with a simple credibility line (no exaggeration).",
        ],
      },
    ],
    visualIdentity: {
      whatLooksGood:
        "Your visual structure likely supports scanning (clear headline + supporting text + CTA).",
      oneHighImpactImprovement: {
        title: "Increase CTA contrast and hierarchy",
        steps: [
          "Make the primary CTA a filled button and keep secondary actions as text links.",
          "Increase spacing around the CTA to isolate it visually.",
          "Ensure the CTA color contrasts strongly with the hero background.",
          "Use one consistent button style site-wide.",
        ],
      },
    },
    silentIntelligence: {
      benchmark:
        "Compared to similar SaaS landing pages, the biggest opportunity is usually message specificity in the hero. Fixing that first tends to reduce immediate bounce.",
      visitorSimulation:
        "A first-time visitor may think: 'What exactly is this?' → 'Is it for me?' → 'What happens after I click?' Your job is to answer those in the first screen with no guessing.",
    },
    score: { clarity: 5, focus: 6, trust: 4 },
    followUp: {
      title: "Follow-up review",
      text:
        "After you implement changes, run a follow-up review to validate what improved and what still needs adjustment. This focuses only on what changed.",
    },
  };

  return res.status(200).json({ id, report });
}
