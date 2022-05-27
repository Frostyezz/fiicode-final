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
        const { email, password, username } = req.body;

        const hash = await bcrypt.hash(password, 10);

        const account = new Account({
          email,
          username,
          password: hash,
        });
        const user = await account.save();

        res.status(200).json({ user });
      } catch (error: any) {
        res.status(403).json({ error: error.message });
      }
      break;

    default:
      break;
  }
}
