import type { NextApiRequest, NextApiResponse } from "next";

function makeId() {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 8)
  ).toUpperCase();
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Aceita APENAS POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const url = String(req.body?.url ?? "");
  const businessType = String(req.body?.businessType ?? "");
  const goal = String(req.body?.goal ?? "");
  const traffic = String(req.body?.traffic ?? "");

  const id = makeId();

  // RELATÓRIO MOCK (formato final do produto)
  const report = {
    meta: {
      id,
      createdAt: new Date().toISOString(),
      input: { url, businessType, goal, traffic },
      version: "v1-mock",
    },

    strengths: [
      "Your CTA intent is clear and focused on a single primary action.",
      "The page appears to be oriented around one core goal, which already puts it ahead of most.",
    ],

    mainIssue: {
      title: "Message clarity under time pressure",
      explanation:
        "A first-time visitor should understand what you do and who it’s for within about three seconds. Right now, the top section likely requires interpretation, which creates hesitation and early drop-off.",
    },

    fixPlaybook: {
      objective:
        "Make the first screen instantly communicate what this is, who it’s for, and why it matters.",
      checklist: [
        "Describe the product in one plain-language sentence.",
        "Rewrite the headline to include audience + outcome.",
        "Rewrite the subheadline to explain how the outcome is achieved.",
        "Ensure there is only one primary CTA above the fold.",
        "Add one credibility element close to the CTA.",
        "Remove any element above the fold that does not support the main action.",
        "Run a 3-second test with a cold user.",
        "Iterate until the message is immediately clear.",
      ],
      copyExamples: {
        headlines: [
          "Improve {Outcome} for {Audience} without {Common Pain}",
          "{Audience}: turn visitors into {Primary Action} with a clearer first screen",
          "A clearer landing page for teams that want more {Result}",
        ],
        ctas: [
          "Run the diagnosis",
          "Get my report",
          "See what to fix first",
        ],
      },
      commonMistakes: [
        "Describing features instead of outcomes in the headline.",
        "Using multiple competing CTAs above the fold.",
        "Placing proof too far down the page.",
      ],
      quickValidation: [
        "Can a cold visitor explain what the product does in one sentence?",
        "Is the CTA the most visually dominant element?",
        "Is there at least one trust signal near the CTA?",
      ],
    },

    secondaryIssues: [
      {
        title: "CTA specificity",
        howTo: [
          "Use a CTA that matches the user's mental step.",
          "Avoid generic labels like 'Submit' or 'Learn more'.",
          "Keep secondary actions as text links, not buttons.",
        ],
      },
      {
        title: "Proof placement",
        howTo: [
          "Move one proof element closer to the hero section.",
          "Use a short credibility line instead of long testimonials.",
          "Avoid exaggerated or vague claims.",
        ],
      },
    ],

    visualIdentity: {
      whatLooksGood:
        "The visual hierarchy likely supports scanning with a clear headline and CTA.",
      oneHighImpactImprovement: {
        title: "Increase CTA contrast and hierarchy",
        steps: [
          "Use a filled button style for the primary CTA.",
          "Increase spacing around the CTA to isolate it visually.",
          "Ensure strong contrast between the CTA and background.",
          "Standardize button styles across the page.",
        ],
      },
    },

    silentIntelligence: {
      benchmark:
        "Across similar SaaS landing pages, message clarity in the hero is the most common conversion blocker.",
      visitorSimulation:
        "A new visitor may think: 'What is this?' → 'Is it for me?' → 'What happens if I click?' The first screen should answer all three without effort.",
    },

    score: {
      clarity: 5,
      focus: 6,
      trust: 4,
    },

    followUp: {
      title: "Follow-up review",
      text:
        "After implementing changes, you can run a follow-up review to validate what improved and what still needs adjustment.",
    },
  };

  return res.status(200).json({ id, report });
}
