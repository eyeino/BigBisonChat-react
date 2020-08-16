import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect
} from 'react-router-dom';

import Nav from './main/Nav'; // navigation bar
import Home from './main/Home'; // login page
import Conversations from './conversations/Conversations'; // list of convos
import Chat from './chat/ChatWindow'; // list of messages in a convo
import Callback from './auth/Callback'; // callback url for Auth0
import ChatInput from './chat/ChatInput'; // input bar for messages in chat window
import { RecipientBar } from './chat/RecipientBar'; // input bar for recipient in new message
import { useWindowSize } from './hooks/useWindowSize';

function App(props) {
  const { auth } = props;
  const loggedIn = auth.isAuthenticated();

  const [recipient, setRecipient] = useState(null);
  const windowSize = useWindowSize();

  // for iOS devices and their finicky viewport handling :/
  document.documentElement.style.setProperty('--app-height', `${windowSize.height}px`);

  return (
    <Router>
      {/* Wrapper for header, content, footer */}
      <div className="flex flex-col justify-start h-screen">
        <header className="header header-shadow">
          <Nav auth={props.auth} />
        </header>
        <main className="m-2 flex-grow">
          <Switch>
            <Route path='/new' render={() => <RecipientBar setRecipient={setRecipient} />}></Route>
          </Switch>
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
            <Route path="/new" render={(props) => (<div></div>)} />
            <Route path="/conversations/:username" render={ (props) =>
              <>
                {/* wide screens get conversations and detailview */}
                { windowSize.width >= 640 &&
                  <div className="flex w-full justify-between space-x-2">
                    <Conversations {...props} />
                    <section className="flex-grow">
                      <Chat {...props} />
                      <ChatInput {...props} />
                    </section>
                  </div>
                }
                {/* small screen only gets conversations */}
                { windowSize.width < 640 &&
                  <div className="">
                    <Chat {...props} />
                    <ChatInput {...props} />
                  </div>
                }
              </>
            } />
            <Route path="/conversations" render={ (props) =>
              <>
                { windowSize.width >= 768 &&
                  <div className="detail-view-wrapper">
                    <Conversations {...props} />
                    <section className="chat-window-wrapper" />
                  </div>
                }
                { windowSize.width < 768 &&
                  <Conversations {...props} title="BigBisonChat - Convos" />
                }
              </>
            }/>
            <Route render={() => <p>Not found!</p>} />
          </Switch>
        </main>
        {/* Footer: renders only if viewing a chat */}
        <Switch>
          <Route path='/new' render={(props) => (
            <div className="m-2">
             <ChatInput {...props} recipient={recipient} />
            </div>
          )} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;