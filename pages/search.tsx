import Head from "next/head";
import React, { useState } from "react";

import { MessageInput } from "../src/components/chat/MessageInput"; // input bar for messages in chat window
import { UserSearchBar } from "../src/components/chat/UserSearchBar"; // input bar for recipient in new message
import { Bison } from "../src/components/svg/Bison";

function SearchUsersPage() {
  const [recipient, setRecipient] = useState<string>();

  return (
    <div className="flex flex-col h-[100vh-86px]">
      <Head>
        <title>BigBisonChat – Search Users</title>
      </Head>
      <section className="mt-[86px] flex-shrink-0">
        <UserSearchBar
          setRecipient={setRecipient}
          recipient={recipient ?? ""}
        />
      </section>
      <div>
        <Bison className="h-[70vh] flex-grow mx-auto sm:m-auto w-48 fill-current text-gray-200" />
      </div>
      <div className="w-full p-4 fixed bottom-0 space-y-4">
        <MessageInput recipient={recipient ?? ""} />
      </div>
    </div>
  );
}

export default SearchUsersPage;
