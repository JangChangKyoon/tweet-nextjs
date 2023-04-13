import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const tweets = await client.tweet.findMany({});

    res.json({
      ok: true,
      tweets,
    });
  }

  if (req.method === "POST") {
    const {
      body: { name, description, image },
      session: { user },
    } = req;
    // console.log(description);
    //   console.log("sdfds");
    const tweet = await client.tweet.create({
      data: {
        text: description,

        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      tweet,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
