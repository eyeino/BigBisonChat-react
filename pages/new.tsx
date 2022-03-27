import React, { useState } from "react";

import { MessageInput } from "../src/components/chat/MessageInput"; // input bar for messages in chat window
import { RecipientInput } from "../src/components/chat/RecipientInput"; // input bar for recipient in new message
import { Bison } from "../src/components/svg/Bison";

function NewPage() {
  const [recipient, setRecipient] = useState(null);

  return (
    <>
      <div className="flex flex-col justify-start sm:h-screen">
        <main className="sm:overflow-hidden flex flex-col m-2">
          <RecipientInput setRecipient={setRecipient} recipient={recipient} />
          <Bison className="mx-auto sm:m-auto mt-20 h-48 w-48 fill-current text-gray-200" />
        </main>
      </div>
      <div className="w-full p-4 fixed bottom-0 space-y-4">
        <MessageInput recipient={recipient} />
      </div>
    </>
  );
}

export default NewPage;
