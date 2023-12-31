"use client";

import { usePathname, useSearchParams } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="z-10 px-24 bg-zinc-800 w-full items-center text-white	font-semibold text-md lg:flex">
      <ul className="flex">
        <li
          className={`p-4 ${pathname === "/" && "bg-red-600"} hover:bg-red-300`}
        >
          <a className="text-white-500" href="/">
            Search
          </a>
        </li>
        <li
          className={`p-4 ${
            pathname === "/visualisation" && "bg-red-600"
          } hover:bg-red-300`}
        >
          <a href="/visualisation" className="text-white-500">
            Visualisation
          </a>
        </li>
      </ul>
    </div>
  );
}
