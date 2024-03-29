import { NextApiRequest, NextApiResponse } from "next";
type method = "GET" | "POST" | "DELETE";
type methods = method[];

export default function withHandler(
  method: methods,
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    //잘못된 경로로부터 보호
    if (req.method && !method.includes(req.method as any)) {
      return res.status(405).end();
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
