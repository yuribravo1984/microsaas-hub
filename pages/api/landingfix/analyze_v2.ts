import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed", got: req.method });
  }

  return res.status(200).json({
    ok: true,
    got: req.method,
    body: req.body ?? null,
    ts: new Date().toISOString(),
  });
}

