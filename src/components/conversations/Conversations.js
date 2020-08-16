import React, { useEffect, useState } from 'react';

import ConversationCell from './ConversationCell';
import { getConversations } from '../../utils/api.js';

export default function Conversations(props) {
  const [conversations, setConversations] = useState([]);
  document.title = props.title;

  
  useEffect(() => {
    getConversations().then((res, err) => {
      setConversations(res.data);
    });
  }, []);

  return (
    <section className="flex-grow sm:max-w-xs sm:border-r-2 sm:border-gray-100">
      {conversations &&
        conversations
          .reduce((unique, item) => {
            return unique.includes(item.other_username) ? unique : [...unique, item, item.other_username]
          }, [])
          .filter(item => typeof item === 'object')
          .map(convo => {

          return (
            <ConversationCell
              key={convo.other_username}
              username={convo.other_username}
              body={convo.body}
              avatarUrl={convo.avatar_url}
              createdAt={convo.created_at}
              selected={props.match.params.username === convo.other_username}
            />
          );
        })}
      {!conversations && (
        <>
          <p>Welcome! You don't have any conversations yet!</p>
          <p>Press 'New' and start talking!</p>
        </>
      )}
    </section>
  );
}