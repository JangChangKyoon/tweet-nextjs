import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import type { NextPage } from "next";

const Home: NextPage = () => {
  // const user = useUser();
  // console.log(user);
  const { user, isLoading } = useUser();
  console.log(user);
  return (
    <div>
      <Layout title="홈"></Layout>
      Hello
    </div>
  );
};
export default Home;
