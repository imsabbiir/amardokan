'use client'
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
function GetStartedButton({ href, title, close = false, closeSidebar, className={} }) {
  const handleClick = () => {
    if (close && closeSidebar) {
      closeSidebar();
    }
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${className} group flex w-fit items-center rounded-xl bg-ac text-sm font-semibold text-bd transition-all hover:brightness-110`}
    >
      {" "}
      <span>{title}</span>{" "}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
    </Link>
  );
}
export default GetStartedButton
