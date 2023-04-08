import { cls } from "@libs/client/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

//😒 인자 타입 지정
interface LayoutProps {
  title?: string;
  // 상단 탑 고정 텍스트
  canGoBack?: boolean;
  // 뒤로가기 존재 여부
  hasTabBar?: boolean;
  // 네비게이션이 존재하는 페이지이냐 아니냐 구분함
  children: React.ReactNode;
  // 본문 전체페이지를 의미함
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  //🥶 뒤로가기 버튼 useRouter
  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  return (
    <div>
      <div
        className={cls(
          !canGoBack ? "justify-center" : "",
          "bg-white w-full max-w-xl text-lg px-10 font-medium py-3 fixed text-gray-800 border-b top-0  flex  items-center"
        )}
      >
        {canGoBack ? (
          <button className="" onClick={onClick}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
        ) : null}
        {title ? (
          <span className={cls(canGoBack ? "mx-auto" : "")}>{title}</span>
        ) : null}
      </div>

      <div className={cls("pt-12", hasTabBar ? "pb-24" : "")}>{children}</div>

      {hasTabBar ? (
        <nav className="bg-white max-w-xl text-gray-700 border-t fixed bottom-0 w-full px-10 pb-5 pt-3 flex justify-between text-xs">
          <Link href="/" legacyBehavior>
            <a className="flex flex-col items-center space-y-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span>홈</span>
            </a>
          </Link>

          <Link href="/community" legacyBehavior>
            <a className="flex flex-col items-center space-y-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                ></path>
              </svg>
              <span>동내생활</span>
            </a>
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
