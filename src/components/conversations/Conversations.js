import React, { useEffect, useState } from 'react';

import ConversationCell from './ConversationCell';
import { getConversations } from '../../utils/API.js';

export default function Conversations(props) {
  const [conversations, setConversations] = useState([]);
  
  useEffect(() => {
    document.title = props.title;

    getConversations().then((res, err) => {

      setConversations(res.data);
    })
  }, []);

  return (
    <div>
      {conversations && 
        conversations.map((convo) => {
        return <ConversationCell key={convo.other_username} username={convo.other_username}
          body={convo.body}
          avatarUrl={convo.avatar_url}
          createdAt={convo.created_at}
        />
      })}
    </div>
  )
}