import React, { useEffect, useState } from 'react';
import ConversationCell from './ConversationCell';
import { getConversations } from '../../utils/API';

export default function Conversations() {
  const [conversations, setConversations] = useState([]);
  
  useEffect(() => {
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
          avatarUrl={convo.avatarUrl}
        />
      })}
    </div>
  )
}