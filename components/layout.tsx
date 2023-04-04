import React from "react";
import { cls } from "@/libs/utils";

interface LayoutProps {
  title?: string;
}

export default function Layout({ title }: LayoutProps) {
  return (
    <div className="w-full flex justify-center items-center text-lg text-gray-800 border-b">
      <div>{title ? <span>{title}</span> : null}</div>
    </div>
  );
}
