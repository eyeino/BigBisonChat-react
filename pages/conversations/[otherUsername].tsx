import React, { useState } from "react";

import ConversationList from "../../src/components/conversations/Conversations"; // list of convos
import { MessageList } from "../../src/components/chat/MessageList"; // list of messages in a convo
import { MessageInput } from "../../src/components/chat/MessageInput"; // input bar for messages in chat window
// import { ReactComponent as Logo } from "./assets/bison.svg";
import { useWindowSize } from "../../src/components/hooks/useWindowSize";
import { useRouter } from "next/router";
import Head from "next/head";

export default function OtherUsernameConversationPage() {
  const windowSize = useWindowSize();

  const router = useRouter();
  const { otherUsername } = router.query;

  const bottomOfListElementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomOfListElementRef.current.scrollIntoView({ behavior: "smooth" });
  }, [otherUsername, windowSize, bottomOfListElementRef]);

  return (
    <div className="relative">
      <Head>
        <title>BigBisonChat – {otherUsername}</title>
      </Head>
      {/* wide screens get conversations and detailview */}
      {windowSize.width >= 640 && (
        <div className="flex w-full justify-between">
          <section className="space-y-2 overflow-y-auto sm:max-w-xs flex-shrink-0 flex flex-col min-h-[calc(100vh-86px)] max-h-[calc(100vh)]">
            <div className="mt-[86px]"></div>
            <ConversationList />
            <div className="mb-[86px]"></div>
          </section>
          <section className="relative ml-2 overflow-y-scroll flex flex-col flex-grow min-h-[calc(100vh-86px)] max-h-[calc(100vh)]">
            <div className="mt-[86px]"></div>
            <p className="py-2 text-sm uppercase text-gray-300 text-center">
              Your BigBisonChat with {otherUsername}
            </p>
            <MessageList />
            <div ref={bottomOfListElementRef} className="mb-[86px]"></div>
            <div className="fixed bottom-0 right-0 p-4 backdrop-blur-sm h-20 w-1/2">
              <MessageInput recipient={otherUsername} />
            </div>
          </section>
        </div>
      )}
      {/* small screen only gets specific conversation */}
      {windowSize.width < 640 && (
        <section className="flex-grow flex flex-col">
          <div className="min-h-[calc(100vh-86px)] max-h-[calc(100vh)] overflow-y-auto">
            <div className="mt-[86px]"></div>
            <p className="py-2 text-sm uppercase text-gray-300 text-center">
              Your BigBisonChat with {otherUsername}
            </p>
            <MessageList />
            <div ref={bottomOfListElementRef} className="mb-[86px]"></div>
          </div>
          <div className="w-full p-4 bg-gray-100 bg-opacity-75 rounded-lg fixed bottom-0">
            <MessageInput recipient={otherUsername} />
          </div>
        </section>
      )}
    </div>
  );
}
