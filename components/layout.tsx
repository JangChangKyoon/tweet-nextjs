import React from "react";
import { cls } from "@/libs/utils";

interface LayoutProps {
  title?: string;
}

export default function Layout({ title }: LayoutProps) {
  return <div>{title ? <span>{title}</span> : null}</div>;
}
