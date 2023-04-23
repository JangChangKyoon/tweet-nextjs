import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { terms } = req.query;
  // url에서 검색어 가져오기

  // url에서 가져온 검색어로 데이터베이스 조회하여 데이터 가져오기
  const search = await client.tweet.findMany({
    where: {
      text: terms + "",
    },
  });

  res.json({ ok: true, search });
  // 조회한 데이터를 FrontEnd로 보내기
}
export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
