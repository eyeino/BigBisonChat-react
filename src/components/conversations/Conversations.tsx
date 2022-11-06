import React from "react";
import ConversationCell from "./ConversationCell";
import { useRouter } from "next/router";

interface Conversation {
  other_username: string;
  body: string;
  avatar_url: string;
  created_at: string;
}

interface Props {
  data: Conversation[];
  error: unknown;
}

export default function Conversations({ data, error }: Props) {
  const router = useRouter();
  const { otherUsername } = router.query;

  return (
    <>
      {data &&
        data
          .reduce(
            (
              acc: {
                uniqueUsernames: string[];
                uniqueConversations: Conversation[];
              },
              item
            ) => {
              if (acc.uniqueUsernames.includes(item.other_username)) {
                return acc;
              } else {
                return {
                  uniqueUsernames: [
                    ...acc.uniqueUsernames,
                    item.other_username,
                  ],
                  uniqueConversations: [...acc.uniqueConversations, item],
                };
              }
            },
            { uniqueUsernames: [], uniqueConversations: [] }
          )
          .uniqueConversations.map((convo: Conversation) => {
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
          Give it a minute, the Railway server is awakening...
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
