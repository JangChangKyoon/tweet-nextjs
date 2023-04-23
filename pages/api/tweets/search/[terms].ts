import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { terms } = req.query;
  // url에서 검색어 가져오기

  //검색어를 띄어쓰기 단위로 끊어서 리스트로 만들기(리스트의 각 요소별 검색 위해)
  const termsArr = String(terms)
    .split(" ")
    .map((word) => ({
      text: {
        contains: word,
      },
    }));

  // url에서 가져온 검색어로 데이터베이스 조회하여 데이터 가져오기
  const search = await client.tweet.findMany({
    where: {
      OR: termsArr,
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
