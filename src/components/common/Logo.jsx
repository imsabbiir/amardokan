import Link from "next/link";
import React from "react";

function Logo({name, title, icon}) {
  return (
    <Link
      href="/"
      className="flex gap-3 items-center"
    >
      <div className="h-11 w-11 bg-ac rounded-xl relative">
        <h1 className="text-xl font-extrabold text-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{icon}</h1>
      </div>

      <span className="min-w-0">
        <span className="block truncate text-lg font-bold tracking-tight text-ac">{name}</span>
        <span className="block text-xs text-slate-400">{title}</span>
      </span>
    </Link>
  );
}

export default Logo;
