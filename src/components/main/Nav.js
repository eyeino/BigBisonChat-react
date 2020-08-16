import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/bison.svg";

function Nav(props) {
  return (
    <nav className="flex items-center justify-between flex-wrap p-4 rounded border-b-2 border-gray-100">
      <NavLink className="flex items-center flex-shrink-0 mr-2 text-red-900" to="/">
        <Logo className="fill-current h-8 w-8 mr-2" />
        <span className="font-semibold text-xl tracking-tight hidden sm:inline">BigBisonChat</span>
      </NavLink>
      <ul className="flex items-baseline justify-between text-red-900 sm:ml-auto">
        {props.auth.isAuthenticated() && (
          <>
            <li>
              <NavLink className="font-semibold inline-block text-underline py-1 px-2 rounded outline-none focus:shadow-outline hover:bg-red-200 ml-auto" activeClassName="bg-red-300 shadow-inner" to="/new">
                New
              </NavLink>
            </li>
            <li>
              <NavLink exact className="inline-block font-semibold text-underline py-1 px-2 rounded outline-none focus:shadow-outline hover:bg-red-200 ml-2" activeClassName="bg-red-300 shadow-inner" to="/conversations">
                Convos
              </NavLink>
            </li>
            <li>
              <button type="button" className="text-gray-600 rounded bg-gray-200 py-1 px-2 outline-none focus:shadow-outline ml-2" onClick={props.auth.logout}>
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
