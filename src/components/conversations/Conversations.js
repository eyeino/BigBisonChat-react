import React from "react";
import ky from "ky";

import ConversationCell from "./ConversationCell";

import useSWR from "swr";
import { useRouter } from "next/router";

const conversationsFetcher = ky.get("/api/bigbison/conversations").json;

export default function Conversations() {
  const router = useRouter();
  const { otherUsername } = router.query;

  const { data, error } = useSWR(`conversations/`, conversationsFetcher);

  return (
    <>
      {data &&
        data
          .reduce((unique, item) => {
            return unique.includes(item.other_username)
              ? unique
              : [...unique, item, item.other_username];
          }, [])
          .filter((item) => typeof item === "object")
          .map((convo) => {
            return (
              <ConversationCell
                key={convo.other_username}
                username={convo.other_username}
                body={convo.body}
                avatarUrl={convo.avatar_url}
                createdAt={convo.created_at}
                selected={otherUsername === convo.other_username}
              />
            );
          })}
      {error && (
        <div className="p-4 bg-red-100 text-red-700">Failure to load.</div>
      )}
      {!data && !error && (
        <div className="p-4 bg-yellow-100 text-yellow-700">
          Give them a minute, the Heroku server is awakening...
        </div>
      )}
      {data && data.length === 0 && (
        <div className="p-4 bg-yellow-100 text-yellow-700">
          <p>Welcome! You don't have any conversations yet! </p>
          <p>Press 'New' above and start talking!</p>
        </div>
      )}
    </>
  );
}
