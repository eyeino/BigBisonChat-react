import React, { useState } from "react";

import ConversationList from "../../src/components/conversations/Conversations"; // list of convos
import { MessageList } from "../../src/components/chat/MessageList"; // list of messages in a convo
import { MessageInput } from "../../src/components/chat/MessageInput"; // input bar for messages in chat window
// import { ReactComponent as Logo } from "./assets/bison.svg";
import { useWindowSize } from "../../src/components/hooks/useWindowSize";
import { useRouter } from "next/router";

export default function OtherUsernameConversationPage() {
  const windowSize = useWindowSize();

  const router = useRouter();
  const { otherUsername } = router.query;

  return (
    <>
      {/* wide screens get conversations and detailview */}
      {windowSize.width >= 640 && (
        <div className="flex w-full justify-between">
          <ConversationList />
          <section className="flex flex-col flex-grow">
            <MessageList />
            <div className="p-4 bg-gray-100">
              <MessageInput recipient={otherUsername} />
            </div>
          </section>
        </div>
      )}
      {/* small screen only gets specific conversation */}
      {windowSize.width < 640 && (
        <div className="flex-grow flex flex-col">
          <MessageList />
          <div className="w-full p-4 bg-gray-100 bg-opacity-75 rounded-lg fixed bottom-0">
            <MessageInput recipient={otherUsername} />
          </div>
        </div>
      )}
    </>
  );
}
