// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.setHeader("Allow", "POST").status(405).end("Method Not Allowed");
  }

  const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;
  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

  if (!MAILERLITE_GROUP_ID || !MAILERLITE_API_KEY) {
    return res.status(500).json({ error: "Missing MAILERLITE_GROUP_ID or MAILERLITE_API_KEY" });
  }
  const email = req.body.email;
  if (typeof email !== "string") {
    return res.status(400).json({ error: "Email is not a string" });
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-MailerLite-ApiKey": MAILERLITE_API_KEY,
    },
    body: JSON.stringify({ email: email }),
  };

  const mailerliteResponse = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${MAILERLITE_GROUP_ID}/subscribers`,
    options
  );
  if (!mailerliteResponse.ok) {
    return res.status(500).json({ error: "Something went wrong!" });
  }

  return res.status(201).json({});
};

export default handler;
