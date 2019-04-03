import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav(props) {
  return (
    <ul className="nav">
      <li>
        <div className="logotype">BigBisonChat</div>
      </li>

      {props.loggedIn && (
        <>
        <li>
          <NavLink activeClassName="active" to="/conversations">
            Conversations
        </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/logout">
            Logout
          </NavLink>
        </li>
        </>
      )}
    </ul>
  );
}

export default Nav;