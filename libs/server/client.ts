import { PrismaClient } from "@prisma/client";

//🥶2. 타입 설정
declare global {
  var client: PrismaClient | undefined;
}

//😒1. client를 설정한다 || 없으면 새로 만든다
const client =
  global.client ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV === "development") global.client = client;

export default client;
