import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import type { NextPage } from "next";

// interface ProductWithCount extends Product {
//   _count: {
//     favs: number;
//   };
// }

const Home: NextPage = () => {
  // const user = useUser();
  // console.log(user);
  const { user, isLoading } = useUser();
  console.log(user);
  return (
    <Layout title="홈" canGoBack hasTabBar>
      <div>Hello</div>
    </Layout>
  );
};
export default Home;
