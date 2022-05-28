import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
// @ts-ignore
import Family from "../../../models/Family";
// @ts-ignore
import Map from "../../../models/Map";

type Data = {
  family?: any;
  map?: any;
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
        const family = await Family.findOne({ members: id });
        const map = await Map.findOne({ family: family._id });
        res.status(200).json({ family, map });
      } catch (error: any) {
        res.status(403).json({ error: error.message });
      }
      break;
    case "POST":
      try {
        await Map.findByIdAndUpdate(id, { $push: { markers: req.body } });
        res.status(200);
        res.end();
      } catch (error: any) {
        console.log(error);
        res.status(403).json({ error: error.message });
      }
      break;
    default:
      break;
  }
}
