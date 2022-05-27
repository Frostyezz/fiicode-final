import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const serialised = serialize("JWT", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: -1,
          path: "/",
        });
        res.setHeader("Set-Cookie", serialised);
        res.status(200);
        res.end();
      } catch (error) {
        res.status(403);
      }
      break;

    default:
      break;
  }
}
