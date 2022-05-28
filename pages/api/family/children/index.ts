import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/dbConnect";
// @ts-ignore
import Family from "../../../../models/Family";
// @ts-ignore
import Children from "../../../../models/Children";

type Data = {
  family?: string;
  name?: string;
  id?: string;
  avatar?: string;
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
        const { name, id, avatar } = req.body;

        const child = new Children({ name, avatar });

        const saved = await child.save();

        const family = Family.findOneAndUpdate(
          { members: id },
          { $push: { children: { name: saved.name, id: saved._id, avatar } } },
          { new: true },
          (err: any, doc: any) => {
            res.status(200).json({
              family: doc._id,
              name: saved.name,
              id: saved._id,
              avatar,
            });
          }
        );
      } catch (error: any) {
        res.status(403).json({ error: error.message });
      }
      break;

    default:
      break;
  }
}
