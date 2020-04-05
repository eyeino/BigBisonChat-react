import React, { useEffect, useState } from 'react';

import ConversationCell from './ConversationCell';
import { getConversations } from '../../utils/api.js';

export default function Conversations(props) {
  const [conversations, setConversations] = useState([]);
  
  useEffect(() => {
    document.title = props.title;

    getConversations().then((res, err) => {
      setConversations(res.data);
    });
  }, []);

  return (
    <div className="conversations">
      {conversations &&
        conversations.map(convo => {
          return (
            <ConversationCell
              key={convo.other_username}
              username={convo.other_username}
              body={convo.body}
              avatarUrl={convo.avatar_url}
              createdAt={convo.created_at}
              selected={props.selectedConversation === convo.other_username}
              setSelectedConversation={props.setSelectedConversation}
            />
          );
        })}
      {!conversations && (
        <>
          <div>Welcome! You don't have any conversations yet!</div>
          <div>Press 'New' and start talking!</div>
        </>
      )}
    </div>
  );
}