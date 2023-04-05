import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      username: string;
    };
  }
}

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

  if (!exists) res.status(404).end();
  console.log(exists);
  req.session.user = {
    username: exists?.username + "",
  };

  await req.session.save();

  return res.json({
    ok: true,
  });
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "tweetsession",
  password:
    "9845904809485098594385093840598df;slkgjfdl;gkfsdjg;ldfksjgdsflgjdfklgjdflgjflkgjdgd",
});
