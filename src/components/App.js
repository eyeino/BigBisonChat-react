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
import { ReactComponent as Logo } from "./assets/bison.svg";
import { useWindowSize } from './hooks/useWindowSize';
import { FixedBottom } from 'react-fixed-bottom';

function App(props) {
  const { auth } = props;
  const loggedIn = auth.isAuthenticated();

  const [recipient, setRecipient] = useState(null);
  const windowSize = useWindowSize();

  return (
    <Router>
      {/* Wrapper for header, content, footer */}
      <div className="flex flex-col justify-start h-screen">
        <header className="block sticky top-0 w-full bg-white mb-0 z-50 border-b-2 border-gray-100">
          <Nav auth={props.auth} />
          <Switch>
            <Route path='/new' render={() => <RecipientBar setRecipient={setRecipient} />}></Route>
          </Switch>
        </header>
        <main className="flex-grow sm:overflow-hidden flex flex-col">
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
            <Route path="/new" render={(props) => (<Logo className="m-auto h-48 w-48 fill-current text-gray-200" />)} />
            <Route path="/conversations/:username" render={ (props) =>
              <>
                {/* wide screens get conversations and detailview */}
                { windowSize.width >= 640 &&
                  <div className="flex w-full sm:h-full justify-between">
                    <Conversations {...props} />
                    <section className="flex-grow flex flex-col">
                      <Chat {...props} />
                      <div className="p-4 border-t-2 border-gray-100">
                        <ChatInput {...props } />
                      </div>
                    </section>
                  </div>
                }
                {/* small screen only gets conversations */}
                { windowSize.width < 640 &&
                  <div className="flex-grow flex flex-col h-full">
                    <Chat {...props} />
                    <FixedBottom>
                      <div className="w-full p-4 bg-transparent rounded-lg" style={{ position: "fixed", bottom: "0", backdropFilter: "blur(20px)" }}>
                        <ChatInput {...props} />
                      </div>
                    </FixedBottom>
                  </div>
                }
              </>
            } />
            <Route path="/conversations" render={ (props) =>
              <>
                { windowSize.width >= 640 &&
                  <div className="flex w-full h-full justify-between space-x-2">
                    <Conversations {...props} />
                    <section className="flex-grow flex flex-col justify-around self-center">
                      <Logo className="self-center my-auto text-gray-200 fill-current h-48 w-48" />
                    </section>
                  </div>
                }
                { windowSize.width < 640 &&
                  <Conversations {...props} title="BigBisonChat - Convos" />
                }
              </>
            }/>
            <Route render={() => <p>Not found!</p>} />
          </Switch>
        </main>
        {/* Footer: renders only if viewing a chat */}
      </div>
        <Switch>
          <Route path='/new' render={(props) => (
            <FixedBottom>
              <div className="w-full p-4" style={{ position: "fixed", bottom: "0" }}>
                <ChatInput {...props} recipient={recipient} />
              </div>
            </FixedBottom>
          )} />
        </Switch>
    </Router>
  );
}

export default App;