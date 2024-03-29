import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import { Tweet } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface TweetsResponse {
  ok: boolean;
  tweets: Tweet[];
}

interface Search {
  search: string;
}

const Home: NextPage = () => {
  const { register, handleSubmit } = useForm<Search>();
  // Input 데이터 송수신 기본 설정하기

  // Input 데이터를 활용하기 위한 useState설정하기
  const [input, setInput] = useState<Search>();

  const { data } = useSWR<TweetsResponse>("/api/tweets");

  // Input 데이터를 가져오기
  const onValid = (searchData: Search) => {
    setInput(searchData);
  };

  // Input 데이터를 이용하여 url을 변경하기
  const router = useRouter();
  useEffect(() => {
    if (input !== undefined) {
      router.push(`/tweets/search/${input.search}`);
    }
  }, [input, router]);

  return (
    <Layout title="홈" canGoBack hasTabBar>
      <Head>
        <title>Home</title>
      </Head>

      <form onSubmit={handleSubmit(onValid)} className="pt-5">
        <input {...register("search")} placeholder="Search" />
        <input type="submit" value="Go" />
      </form>

      <div>
        {data?.tweets?.map((tweet) => (
          <Item
            id={tweet.id}
            key={tweet.id}
            text={tweet.text}
            comments={1}
            hearts={1}
          />
        ))}
        <FloatingButton href="/tweets/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};
export default Home;
