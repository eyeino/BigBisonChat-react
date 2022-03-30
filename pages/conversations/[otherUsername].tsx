import React from "react";

import ConversationList from "../../src/components/conversations/Conversations"; // list of convos
import { MessageList } from "../../src/components/chat/MessageList"; // list of messages in a convo
import { MessageInput } from "../../src/components/chat/MessageInput"; // input bar for messages in chat window
import { useWindowSize } from "../../src/components/hooks/useWindowSize";
import { useRouter } from "next/router";
import Head from "next/head";
import ky from "ky";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const buildMessagesFetcher = (otherUsername) =>
  ky.get(`/api/bigbison/conversations/${otherUsername}`).json;

const conversationsFetcher = ky.get("/api/bigbison/conversations").json;

const buildGetKey = (key) => (pageIndex, previousPageData) => {
  console.log({ pageIndex, previousPageData, key });

  // reached the end
  if (previousPageData && previousPageData.conversation.length === 0)
    return null;

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `/api/bigbison/conversations/${key}?offset=0`;

  console.log({ offset: previousPageData.offset });

  // add the cursor to the API endpoint
  return `/api/bigbison/conversations/${key}?offset=${previousPageData.offset}`;
};

export default function OtherUsernameConversationPage() {
  const windowSize = useWindowSize();

  const router = useRouter();
  const { otherUsername } = router.query;

  const bottomOfListElementRef = React.useRef<HTMLDivElement>(null);

  const {
    data: messagesData,
    error: messagesError,
    size,
    setSize,
  } = useSWRInfinite<any>(
    buildGetKey(otherUsername),
    buildMessagesFetcher(otherUsername),
    {
      refreshInterval: 2000,
    }
  );

  const { data: conversationsData, error: conversationsError } = useSWR(
    `conversations/`,
    conversationsFetcher
  );

  React.useEffect(() => {
    bottomOfListElementRef.current.scrollIntoView({ behavior: "smooth" });
  }, [otherUsername, windowSize]);

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
            <ConversationList
              data={conversationsData}
              error={conversationsError}
            />
            <div className="mb-[86px]"></div>
          </section>
          <section className="relative ml-2 overflow-y-scroll flex flex-col flex-grow min-h-[calc(100vh-86px)] max-h-[calc(100vh)]">
            <div className="mt-[86px]"></div>
            {/* <p className="py-2 text-sm uppercase text-gray-300 text-center">
              Your BigBisonChat with {otherUsername}
            </p> */}
            <button
              className="my-4 bg-green-300 font-bold text-white p-1 w-32 flex-shrink-0 self-center rounded-full"
              onClick={() => setSize(size + 1)}
            >
              LOAD MORE
            </button>
            {messagesData?.map((messagesSection) => (
              <MessageList
                messagesData={messagesSection.conversation}
                messagesError={undefined}
              />
            ))}
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
            <MessageList
              messagesData={messagesData}
              messagesError={messagesError}
            />
            <div ref={bottomOfListElementRef} className="mb-[86px]"></div>
          </div>
          <div className="w-full p-4 backdrop-blur-sm rounded-lg fixed bottom-0">
            <MessageInput recipient={otherUsername} />
          </div>
        </section>
      )}
    </div>
  );
}
