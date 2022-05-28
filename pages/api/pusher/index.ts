import type { NextApiRequest, NextApiResponse } from "next";

import Pusher from "pusher";

import dbConnect from "../../../utils/dbConnect";

export const pusher = new Pusher({
  //@ts-ignore
  appId: process.env.PUSHER_APP_ID,
  //@ts-ignore
  key: process.env.PUSHER_API_KEY,
  //@ts-ignore
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  switch (req.method) {
    case "POST":
      try {
        const { position, id, timestamp, family } = req.body;
        if (position[0]) {
          const response = await pusher.trigger(family, "position-change", {
            position,
            id,
          });
        }
        res.status(200).json({ message: "completed" });
      } catch (error: any) {
        console.log(error);
        res.status(400).json({ error: error.message });
      }

      break;

    default:
      break;
  }
}
