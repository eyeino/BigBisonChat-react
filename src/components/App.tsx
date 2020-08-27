import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Nav from './main/Nav'; // navigation bar
import Home from './main/Home'; // login page
import ConversationList from './conversations/Conversations'; // list of convos
import { MessageList } from './chat/ChatWindow'; // list of messages in a convo
import Callback from './auth/Callback'; // callback url for Auth0
import { ChatInput as MessageInput } from './chat/ChatInput'; // input bar for messages in chat window
import { RecipientBar } from './chat/RecipientBar'; // input bar for recipient in new message
import { useWindowSize } from './hooks/useWindowSize';
import { FixedBottom } from 'react-fixed-bottom';

const logoPath = require('./assets/bison.svg') as string;

const App: React.FC<{ auth: any }> = ({ auth }) => {
  const loggedIn = auth.isAuthenticated();

  const [recipient, setRecipient] = useState(null);
  const windowSize = useWindowSize();

  return (
    <>
      <div className="flex flex-col justify-start sm:h-screen">
        <header className="block sticky top-0 w-full bg-white mb-0 z-50 border-b-2 border-gray-100">
          <Nav auth={auth} />
          <Switch>
            <Route path='/new'>
              <RecipientBar setRecipient={setRecipient} />
            </Route>
          </Switch>
        </header>
        <main className="flex-grow sm:overflow-hidden flex flex-col">
          <Switch>
            <Route exact path="/">
              { loggedIn
              ? <Redirect to="/conversations" />
              : <Home auth={auth} /> }
            </Route>

            <Route path="/callback">
              <Callback auth={auth} />
            </Route>
            
            { !loggedIn && <Redirect from="*" to="/" /> }
            
            <Route path="/new">
              <img className="mx-auto sm:m-auto mt-20 h-48 w-48 fill-current text-gray-200" src={ logoPath } alt="Big Bison Logo" />
            </Route>

            <Route path="/conversations/:username">
                {/* wide screens get conversations and detailview */}
                { windowSize.width >= 640 &&
                  <div className="flex w-full sm:h-full justify-between">
                    <ConversationList />
                    <section className="flex-grow flex flex-col">
                      <MessageList />
                      <div className="p-4 bg-gray-100">
                        <MessageInput recipient={recipient} />
                      </div>
                    </section>
                  </div>
                }
                {/* small screen only gets specific conversation */}
                { windowSize.width < 640 &&
                  <div className="flex-grow flex flex-col h-full">
                    <MessageList />
                    <FixedBottom>
                      <div className="w-full p-4 bg-transparent rounded-lg" style={{ position: "fixed", bottom: "0", backdropFilter: "blur(20px)" }}>
                        <MessageInput recipient={recipient} />
                      </div>
                    </FixedBottom>
                  </div>
                }
            </Route>

            <Route exact path="/conversations">
                { windowSize.width >= 640 &&
                  <div className="flex w-full h-full justify-between space-x-2">
                    <ConversationList />
                    <section className="flex-grow flex flex-col justify-around self-center">
                      <img className="self-center my-auto text-gray-200 fill-current h-48 w-48" src={ logoPath } alt="Big Bison Logo" />
                    </section>
                  </div>
                }
                { windowSize.width < 640 &&
                  <ConversationList />
                }
            </Route>

            <Route render={() => <p>Not found!</p>} />
          </Switch>
        </main>
      </div>
      <Switch>
        <Route path='/new'>
          <FixedBottom>
            <div className="w-full p-4" style={{ position: "fixed", bottom: "0" }}>
              <MessageInput recipient={recipient} />
            </div>
          </FixedBottom>
        </Route>
      </Switch>
    </>
  );
}

export default App;