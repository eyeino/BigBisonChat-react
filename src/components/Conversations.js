import React from 'react';
import ConversationCell from './ConversationCell';

export default function Conversations() {
  return (
    <div>
      {conversations.map(() => {
        return <><ConversationCell /><hr/></>
      })}
    </div>
  )
}

const conversations = [1, 2, 3, 4, 5, 6, 7]