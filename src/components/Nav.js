import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav(props) {
  return (
    <ul className="nav">
      <li>
        <div className="logotype">BigBisonChat</div>
      </li>
      {props.auth.isAuthenticated() && (
        <>
        <li>
          <NavLink activeClassName="active" to="/new">
            New
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/conversations">
            Convos
        </NavLink>
        </li>
        <li>
          <button className="logout-button" onClick={props.auth.logout}>Logout</button>
        </li>
        </>
      )}
    </ul>
  );
}

export default Nav;