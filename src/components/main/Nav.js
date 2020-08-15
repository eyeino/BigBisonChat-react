import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/bison.svg";

function Nav(props) {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-red-500 p-4 m-2 rounded">
      <NavLink className="flex items-center flex-shrink-0 mr-2" to="/">
        <Logo className="fill-current h-10 w-10 mr-2" />
        <span className="font-semibold text-white text-xl tracking-tight hidden sm:inline">BigBisonChat</span>
      </NavLink>
      <ul className="flex items-baseline justify-between text-white sm:ml-auto">
        {props.auth.isAuthenticated() && (
          <>
            <li>
              <NavLink className="font-semibold inline-block text-underline py-1 px-2 rounded outline-none focus:shadow-outline ml-auto" activeClassName="bg-red-600 shadow-inner" to="/new">
                New
              </NavLink>
            </li>
            <li>
              <NavLink exact className="inline-block font-semibold text-underline py-1 px-2 rounded outline-none focus:shadow-outline ml-2" activeClassName="bg-red-600 shadow-inner" to="/conversations">
                Convos
              </NavLink>
            </li>
            <li>
              <button type="button" className="text-red-600 rounded bg-red-400 py-1 px-2 outline-none focus:shadow-outline ml-2" onClick={props.auth.logout}>
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
