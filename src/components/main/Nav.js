import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/bison.svg";

function Nav(props) {
  return (
    <nav>
      <ul className="nav">
        <li className="complete-logo">
          <NavLink id="nav-logo" to="/">
            <Logo className="logo" />
            <div className="logotype">BigBisonChat</div>
          </NavLink>
        </li>
        {props.auth.isAuthenticated() && (
          <>
            <li>
              <NavLink activeClassName="active" to="/new">
                New
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="active" to="/conversations">
                Convos
              </NavLink>
            </li>
            <li>
              <button type="button" className="logout-button" onClick={props.auth.logout}>
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
