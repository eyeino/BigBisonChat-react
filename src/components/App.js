import React from 'react';
import {
  BrowserRouter as
    Router, Route, Switch, Redirect
} from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Conversations from './Conversations';
import Chat from './Chat';
import Callback from './Callback';
import NewChat from './NewChat';
import ChatInput from './ChatInput';

function App(props) {
  const { auth } = props;
  const loggedIn = auth.isAuthenticated()
  
  return (
    <Router>
      {/* Wrapper for header, content, footer vert flex layout */}
      <div className='wrapper'>
        
        <Nav className='header' auth={props.auth} />
        
        <div className='content'>
          <Switch>
            {/* Redirect to list of conversations if logged in, otherwise show login button */}
            <Route exact path="/" render={() => (
                loggedIn ? <Redirect to="/conversations" /> : <Home auth={props.auth} />
            )}
            />
            {/* Callback: to handle authentication flow with Auth0 */}
            <Route path="/callback" render={() => (<Callback auth={props.auth} />)} />
            {/* Redirect from all routes to homepage if not logged in */}
            {!loggedIn && <Redirect from="*" to="/" />}
            
            {/* Chat functions, only accessible if logged in */}
            <Route path="/new" component={NewChat} />
            <Route path="/conversations" component={Conversations} />
            <Route path="/chat" component={Chat} />

            <Route render={() => <p>Not found!</p>} />
          </Switch>
        </div>
        {/* Footer: renders only if currently viewing a chat */}
        <Switch>
          <div className='footer'>
            <Route path='/chat' component={ChatInput} />
            <Route render={() => (<div></div>)}></Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;