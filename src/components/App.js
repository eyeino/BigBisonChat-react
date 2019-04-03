import React from 'react';
import { BrowserRouter as 
  Router, Route, Switch, Redirect } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Conversations from './Conversations';
import Chat from './Chat';

function App(props) {
  return (
    <Router>
      <div>
        <Nav {...props} />
        <Switch>
          <Route exact path='/' render={() => (
            props.loggedIn ? (
              <Redirect to='/conversations' />
            ) : (
              <Home />
            )
          )}/>
          <Route exact path='/conversations'
            component={Conversations} />
          <Route path='/chat' component={Chat} />
          <Route render={() => <p>Not found!</p>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;