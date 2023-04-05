import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // console.log("12314");
  const payload = req.body;
  console.log(payload);
  const user = await client.tweetUser.upsert({
    where: {
      username: payload.username,
    },
    create: {
      ...payload,
    },
    update: {},
  });
  console.log(user);

  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
