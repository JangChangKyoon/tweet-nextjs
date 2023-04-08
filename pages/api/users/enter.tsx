import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);

  console.log(req.session);

  const { username } = req.body;
  console.log(username);

  const exists = await client.tweetUser.findUnique({
    where: {
      username: username,
    },
  });

  if (!exists) return res.status(404).end();
  console.log(exists);
  req.session.user = {
    id: exists.id,
  };

  await req.session.save();

  return res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({ method: "POST", handler, isPrivate: false })
);
