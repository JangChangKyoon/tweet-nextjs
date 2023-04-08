import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

// 2. 아래 useSWR의 두번째 인자이며, useSWR의 첫번째 인자를 가져다가 api를 가져와서 리턴해주는 역할을 함
// const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function useUser() {
  const { data, error } = useSWR("/api/users/me");
  //1. swr에서 api가져오기 설정
  // 첫번째 인자인 url은 캐시의 키역할을 한다.
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
      // 4. data가 있지만 data.ok가 false면 로그인 페이지로 이동
    }
  }, [data, router]);
  return { user: data?.profile, isLoading: !data && !error };
  // 2. data에서 profile을 반환하며, isLoading이 true냐 false냐도 반환
}
