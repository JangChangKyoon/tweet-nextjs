import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   console.log(req.query);
  const { id } = req.query;
  const tweet = await client.tweet.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
  res.json({
    ok: true,
    tweet,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
