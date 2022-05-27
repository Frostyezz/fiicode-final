import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/dbConnect";
import { SignJWT } from "jose";
import { serialize } from "cookie";
import { nanoid } from "nanoid";

const secret = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  switch (req.method) {
    case "POST":
      try {
        const { name, id, family } = req.body;

        const token = await new SignJWT({ id, family, name, role: "CHILD" })
          .setProtectedHeader({
            alg: "HS256",
          })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("30d")
          .sign(new TextEncoder().encode(secret));
        const serialised = serialize("GuardianJWT", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
        res.setHeader("Set-Cookie", serialised);

        res.status(200);
        res.end();
      } catch (error: any) {
        res.status(403).json({ error: error.message });
      }
      break;

    default:
      break;
  }
}
