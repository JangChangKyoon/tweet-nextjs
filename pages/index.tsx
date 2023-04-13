import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { Tweet } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface TweetsResponse {
  ok: boolean;
  tweets: Tweet[];
}

const Home: NextPage = () => {
  // const user = useUser();
  // console.log(user);
  const { user, isLoading } = useUser();
  // console.log(user);

  const { data } = useSWR<TweetsResponse>("/api/tweets");
  console.log(data);
  return (
    <Layout title="홈" canGoBack hasTabBar>
      <Head>
        <title>Home</title>
      </Head>

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
