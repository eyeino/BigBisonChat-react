import React, { useEffect, useState } from 'react';
import ConversationCell from './ConversationCell';
import { getConversations } from '../../utils/API';

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
          avatarUrl={convo.avatarUrl}
        />
      })}
    </div>
  )
}