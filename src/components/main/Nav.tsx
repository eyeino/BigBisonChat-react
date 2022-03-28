import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Bison } from "../svg/Bison";
import cx from "classnames";

function Nav() {
  const userContext = useUser();
  const router = useRouter();

  return (
    <div className="block mb-0 backdrop-blur-sm p-2 rounded-lg">
      <div className="block mb-0 p-2 rounded-lg shadow-md bg-white bg-opacity-50">
        <nav className="flex items-center justify-between flex-wrap p-4 rounded">
          <Link href="/">
            <div className="flex items-center flex-shrink-0 mr-2 text-red-700">
              <Bison className="fill-current h-8 w-8 mr-2" />
              <span className="font-semibold text-xl tracking-tight hidden sm:inline">
                BigBisonChat
              </span>
            </div>
          </Link>
          <ul className="flex items-baseline justify-between text-teal-500 sm:ml-auto">
            {userContext.user && (
              <>
                <li>
                  <Link href="/new">
                    <span
                      className={cx(
                        "font-semibold shadow-sm inline-block text-underline py-1 px-2 rounded-l-lg border border-r-0 outline-none focus:shadow-outline hover:bg-teal-200 ml-auto transition-all duration-150 ease-out",
                        {
                          "bg-teal-100 shadow-inner":
                            router.pathname === "/new",
                        }
                      )}
                    >
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/conversations">
                    <span
                      className={cx(
                        "inline-block shadow-sm border-l font-semibold text-underline py-1 px-2 rounded-r-lg border outline-none focus:shadow-outline hover:bg-teal-200 transition-all duration-150 ease-out",
                        {
                          "bg-teal-100 shadow-inner":
                            router.pathname === "/conversations",
                        }
                      )}
                    >
                      Convos
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    href="/api/auth/logout"
                    className="text-gray-600 shadow-sm rounded bg-gray-200 py-[7px] px-2 outline-none focus:shadow-outline ml-2 hover:bg-gray-300 transition-all duration-150 ease-out"
                  >
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Nav;
