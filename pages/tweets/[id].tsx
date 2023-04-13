import Button from "@components/button";
import Layout from "@components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const ItemDatail = () => {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );

  return (
    <Layout canGoBack>
      <div>
        <div>
          <div />
          <div>
            <div />
            <div>
              <p>{data?.tweet.user.username}</p>
            </div>
          </div>
          <div>
            <h1>{data?.tweet?.text}</h1>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button className="p-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <svg
                  className="h-6 w-6 "
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDatail;
