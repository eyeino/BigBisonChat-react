import React, { useState } from "react";

import Nav from "../../src/components/main/Nav"; // navigation bar
import ConversationList from "../../src/components/conversations/Conversations"; // list of convos
import { MessageList } from "../../src/components/chat/MessageList"; // list of messages in a convo
import { MessageInput } from "../../src/components/chat/MessageInput"; // input bar for messages in chat window
// import { ReactComponent as Logo } from "./assets/bison.svg";
import { useWindowSize } from "../../src/components/hooks/useWindowSize";

function App(props) {
  const { auth } = props;
  const loggedIn = auth.isAuthenticated();

  const [recipient, setRecipient] = useState(null);
  const windowSize = useWindowSize();

  return (
    <>
      <div className="flex flex-col justify-start sm:h-screen">
        <header className="block sticky top-0 w-full bg-white mb-0 z-50 border-b-2 border-gray-100">
          <Nav />
        </header>
        <main className="sm:overflow-hidden flex flex-col">
          {/* wide screens get conversations and detailview */}
          {windowSize.width >= 640 && (
            <div className="flex w-full justify-between">
              <ConversationList />
              <section className="flex flex-col flex-grow">
                <MessageList />
                <div className="p-4 bg-gray-100">
                  <MessageInput recipient={recipient} />
                </div>
              </section>
            </div>
          )}
          {/* small screen only gets specific conversation */}
          {windowSize.width < 640 && (
            <div className="flex-grow flex flex-col">
              <MessageList />
              <div className="w-full p-4 bg-gray-100 bg-opacity-75 rounded-lg fixed bottom-0">
                <MessageInput recipient={recipient} />
              </div>
            </div>
          )}
        </main>
      </div>
      <div className="w-full p-4 fixed bottom-0">
        <MessageInput recipient={recipient} />
      </div>
    </>
  );
}

export default App;
