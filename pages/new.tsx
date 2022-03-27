import React, { useState } from 'react';

import Nav from '../src/components/main/Nav'; // navigation bar
import { MessageInput } from '../src/components/chat/MessageInput'; // input bar for messages in chat window
import { RecipientInput } from '../src/components/chat/RecipientInput'; // input bar for recipient in new message
// import { ReactComponent as Logo } from "../public/assets/bison.svg";
import { useWindowSize } from '../src/components/hooks/useWindowSize';

function NewPage(props) {
  // const { auth } = props;
  // const loggedIn = auth.isAuthenticated();

  const [recipient, setRecipient] = useState(null);
  const windowSize = useWindowSize();

  return (
    <>
      <div className="flex flex-col justify-start sm:h-screen">
        <header className="block sticky top-0 w-full bg-white mb-0 z-50 border-b-2 border-gray-100">
          <Nav />
          <RecipientInput setRecipient={setRecipient} />
        </header>
        <main className="sm:overflow-hidden flex flex-col h-full">
        {/* <Logo className="mx-auto sm:m-auto mt-20 h-48 w-48 fill-current text-gray-200" /> */}
        </main>
      </div>
        <div className="w-full p-4 fixed bottom-0">
          <MessageInput recipient={recipient} />
        </div>
    </>
  );
}

export default NewPage;