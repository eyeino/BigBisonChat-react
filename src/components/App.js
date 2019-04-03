import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as
    Router, Route, Switch, Redirect
} from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Conversations from './Conversations';
import Chat from './Chat';
import Callback from './Callback';

function App(props) {
  const { auth } = props;
  const loggedIn = auth.isAuthenticated()
  
  return (
    <Router>
      <div>
        <Nav auth={props.auth} />
        <hr />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              loggedIn ?
                <Redirect to="/conversations" /> : <Home auth={props.auth} />
            }
          />
          <Route path="/callback" render={() => (<Callback auth={props.auth} />)} />
          {!loggedIn && <Redirect from="*" to="/" />}
          <Route path="/conversations" component={Conversations} />
          <Route path="/chat" component={Chat} />
          <Route render={() => <p>Not found!</p>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;