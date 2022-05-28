import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/dbConnect";
// @ts-ignore
import Family from "../../../../models/Family";
// @ts-ignore
import Children from "../../../../models/Children";

type Data = {
  children?: any[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const family = await Family.findOne({ memebers: id }).select(
          "children"
        );
        res.status(200).json({ children: family.children });
      } catch (error: any) {
        res.status(403).json({ error: error.message });
      }
      break;

    case "DELETE":
      try {
        const deleted = await Children.findByIdAndDelete(id);
        console.log(deleted);
        await Family.findOneAndUpdate(
          { children: { id, name: deleted.name } },
          { $pull: { children: deleted } }
        );
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
