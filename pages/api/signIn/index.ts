import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
// @ts-ignore
import Account from "../../../models/Account";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { serialize } from "cookie";
import { nanoid } from "nanoid";

const secret = process.env.JWT_SECRET;

type Data = {
  user?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  switch (req.method) {
    case "POST":
      try {
        const { email, password } = req.body;

        const account = await Account.findOne({ email });
        if (!account) {
          throw new Error("Account not found!");
        }

        const valid = await bcrypt.compare(password, account.password);

        if (!valid) {
          throw new Error("Invalid password!");
        }

        const token = await new SignJWT({ id: account._id })
          .setProtectedHeader({
            alg: "HS256",
          })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("30d")
          .sign(new TextEncoder().encode(secret));
        const serialised = serialize("JWT", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
        res.setHeader("Set-Cookie", serialised);

        res.status(200).json({ user: account });
      } catch (error: any) {
        res.status(403).json({ error: error.message });
      }
      break;

    default:
      break;
  }
}
