import React, { useEffect, useRef } from "react";
import fecha from "fecha";
import { useRouter } from "next/router";

import useSWR from "swr";
import ky from "ky";
import debounceFn from "debounce-fn";

function scrollToBottom(ref) {
  ref.current &&
    ref.current.scrollIntoView({ behavior: "smooth", alignToTop: true });
}

const conversationFetcher = ky.get("/api/bigbison/conversations").json;

const messagesFetcherBuilder = (otherUsername) =>
  ky.get(`/api/bigbison/conversations/${otherUsername}`).json;

export function MessageList() {
  const router = useRouter();
  const { otherUsername } = router.query;

  if (typeof otherUsername !== "string") {
    return null;
  }

  const { data: messagesData, error: messagesError } = useSWR<any>(
    `/conversations/${otherUsername}`,
    messagesFetcherBuilder(otherUsername),
    {
      refreshInterval: 2000,
    }
  );

  const { data: conversationsData } = useSWR<any>(
    `/conversations`,
    conversationFetcher
  );

  const messagesEnd = useRef(null);

  useEffect(() => {
    scrollToBottom(messagesEnd);
  }, []);

  return (
    <ol className="flex flex-col">
      {messagesData &&
        messagesData.map((message, index) => (
          <ChatBubble
            key={message.message_id}
            message={message}
            otherUsername={otherUsername}
          />
        ))}
      {!messagesData && !messagesError && (
        <div className="mx-auto text-teal-400 bg-teal-100 rounded p-3 uppercase font-semibold">
          Loading
        </div>
      )}
      {messagesError && <div>Error!</div>}
    </ol>
    // <div className="h-16 sm:h-0" ref={messagesEnd} />
  );
}

function ChatBubble(props) {
  const { sender_username, body, created_at } = props.message;

  const epochTime = Date.parse(created_at);
  const timestamp = fecha.format(new Date(epochTime), "MM/DD/YY hh:mmA");

  const { otherUsername } = props;
  const isFromSender = sender_username === otherUsername;

  return (
    <li
      className={`max-w-xs hover:text-gray-500 transition-colors ease-out duration-200 delay-500 text-transparent ${
        isFromSender ? "self-start text-left" : "self-end text-right"
      }`}
    >
      <p
        className={`inline-block p-2 shadow rounded-lg w-auto ${
          isFromSender
            ? "bg-gray-100 text-gray-700 rounded-bl-none"
            : "bg-teal-600 text-white rounded-br-none"
        }`}
        style={{ wordBreak: "break-word", hyphens: "auto" }}
      >
        {body}
      </p>
      <time className="block text-xs">{timestamp}</time>
    </li>
  );
}
