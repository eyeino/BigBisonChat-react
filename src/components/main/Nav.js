import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/bison.svg";

function Nav(props) {
  return (
    <nav className="flex items-center justify-between flex-wrap p-4 rounded">
      <NavLink className="flex items-center flex-shrink-0 mr-2 text-red-900" to="/">
        <Logo className="fill-current h-8 w-8 mr-2" />
        <span className="font-semibold text-xl tracking-tight hidden sm:inline">BigBisonChat</span>
      </NavLink>
      <ul className="flex items-baseline justify-between text-red-900 sm:ml-auto">
        {props.auth.isAuthenticated() && (
          <>
            <li>
              <NavLink className="font-semibold shadow-sm inline-block text-underline py-1 px-2 rounded-l-lg border border-r-0 outline-none focus:shadow-outline hover:bg-red-300 ml-auto transition-all duration-150 ease-out" activeClassName="bg-red-200 shadow-inner" to="/new">
                New
              </NavLink>
            </li>
            <li>
              <NavLink exact className="inline-block shadow-sm border-l font-semibold text-underline py-1 px-2 rounded-r-lg border outline-none focus:shadow-outline hover:bg-red-300 transition-all duration-150 ease-out" activeClassName="bg-red-200 shadow-inner" to="/conversations">
                Convos
              </NavLink>
            </li>
            <li>
              <button type="button" className="text-gray-600 shadow-sm rounded bg-gray-200 py-1 px-2 outline-none focus:shadow-outline ml-2 hover:bg-gray-300 transition-all duration-150 ease-out" onClick={props.auth.logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
