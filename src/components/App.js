import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect
} from 'react-router-dom';

import Nav from './main/Nav'; // navigation bar
import Home from './main/Home'; // login page
import Conversations from './conversations/Conversations'; // list of convos
import Chat from './chat/ChatWindow'; // list of messages in a convo
import Callback from './auth/Callback'; // callback url for Auth0
import NewChat from './chat/NewChat'; // create chat with a user
import ChatInput from './chat/ChatInput'; // input bar for messages in chat window
import { RecipientBar } from './chat/RecipientBar'; // input bar for recipient in new message

function App(props) {
  const { auth } = props;
  const loggedIn = auth.isAuthenticated()
  
  return (
    <Router>
      {/* Wrapper for header, content, footer */}
      <div className='wrapper'>
        <div className='header header-shadow'>
          <Nav auth={props.auth} />
          <Switch>
            <Route path='/new' component={RecipientBar}></Route>
          </Switch>
        </div>
        
        <div className='content'>
          <Switch>
            {/* Redirect to list of conversations if logged in, otherwise show login button */}
            <Route exact path="/" render={() => (
                loggedIn ? <Redirect to="/conversations" /> : <Home auth={props.auth} title='BigBisonChat - Home' />
            )}
            />
            {/* Callback: to handle authentication flow with Auth0 */}
            <Route path="/callback" render={() => (<Callback auth={props.auth} />)} />
            {/* Redirect from all routes to homepage if not logged in */}
            {!loggedIn && <Redirect from="*" to="/" />}
            
            {/* Chat functions, only accessible if logged in */}
            <Route path="/new" render={(props) => (<NewChat {...props} title="BigBisonChat - Create Chat" />)} />
            <Route path="/conversations/:username" component={Chat} />
            <Route path="/conversations" render={(props) => (<Conversations {...props} title="BigBisonChat - Convos" />)} />
            <Route render={() => <p>Not found!</p>} />
          </Switch>
        </div>
        {/* Footer: renders only if viewing a chat */}
        <div className='footer'>
          <Switch>
            <Route path='/new' component={ChatInput} />
            <Route path='/conversations/:username' component={ChatInput} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;