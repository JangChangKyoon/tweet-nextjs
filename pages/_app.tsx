import { SWRConfig } from "swr";
import "./../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    //5.
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          //5.1 url을 인자로 받아들여서 swr을 활용할 수 있게 해줌
          // url이 다를 때마다 코드를 다시 작성해야 되는 낭비를 줄여준다.
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
