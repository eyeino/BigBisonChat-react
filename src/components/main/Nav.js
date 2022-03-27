// @ts-check

import Link from "next/link";
import React from "react";
// import { ReactComponent as Logo } from "../assets/bison.svg";

function Nav(props) {
  return (
    <nav className="flex items-center justify-between flex-wrap p-4 rounded">
      <Link
        // className="flex items-center flex-shrink-0 mr-2 text-red-700"
        href="/"
      >
        {/* <Logo className="fill-current h-8 w-8 mr-2" /> */}
        <span className="font-semibold text-xl tracking-tight hidden sm:inline">
          BigBisonChat
        </span>
      </Link>
      <ul className="flex items-baseline justify-between text-teal-500 sm:ml-auto">
        {
          <>
            <li>
              <Link
                // className="font-semibold shadow-sm inline-block text-underline py-1 px-2 rounded-l-lg border border-r-0 outline-none focus:shadow-outline hover:bg-teal-200 ml-auto transition-all duration-150 ease-out"
                // activeClassName="bg-teal-100 shadow-inner"
                href="/new"
              >
                New
              </Link>
            </li>
            <li>
              <Link
                // className="inline-block shadow-sm border-l font-semibold text-underline py-1 px-2 rounded-r-lg border outline-none focus:shadow-outline hover:bg-teal-200 transition-all duration-150 ease-out"
                // activeClassName="bg-teal-100 shadow-inner"
                href="/conversations"
              >
                Convos
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="text-gray-600 shadow-sm rounded bg-gray-200 py-1 px-2 outline-none focus:shadow-outline ml-2 hover:bg-gray-300 transition-all duration-150 ease-out"
              >
                Logout
              </button>
            </li>
          </>
        }
      </ul>
    </nav>
  );
}

export default Nav;
