import React, { useState } from "react";

import { MessageInput } from "../src/components/chat/MessageInput"; // input bar for messages in chat window
import { UserSearchBar } from "../src/components/chat/UserSearchBar"; // input bar for recipient in new message
import { Bison } from "../src/components/svg/Bison";

function NewPage() {
  const [recipient, setRecipient] = useState(null);

  return (
    <div className="flex flex-col h-[100vh-100px]">
      <section className="mt-[100px] flex-shrink-0">
        <UserSearchBar setRecipient={setRecipient} recipient={recipient} />
      </section>
      <Bison className="flex-grow mx-auto sm:m-auto h-48 w-48 fill-current text-gray-200" />
      <div className="w-full p-4 fixed bottom-0 space-y-4">
        <MessageInput recipient={recipient} />
      </div>
    </div>
  );
}

export default NewPage;
