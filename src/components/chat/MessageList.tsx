import React from "react";
import fecha from "fecha";
import { useRouter } from "next/router";

export function MessageList({ messagesData, messagesError }) {
  const router = useRouter();
  const { otherUsername } = router.query;

  if (typeof otherUsername !== "string") {
    return null;
  }

  return (
    <ol className="flex flex-col">
      {messagesData &&
        messagesData.map((message) => (
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
