import React from 'react';
import ConversationCell from './ConversationCell';

export default function Conversations() {
  return (
    <div>
      {conversations.map(() => {
        return <ConversationCell />
      })}
    </div>
  )
}

const conversations = [
  {
    with: 'Suzanne',
    latestMessage: {
      timestamp: '4/2',
      body: "what's going on?"
    }
  },
  {
    with: 'Suzie',
    latestMessage: {
      timestamp: '4/2',
      body: "what's going on?"
    }
  },
  {
    with: 'Suz',
    latestMessage: {
      timestamp: '4/2',
      body: "what's going on?"
    }
  },
  {
    with: 'Sushi',
    latestMessage: {
      timestamp: '4/2',
      body: "what's going on?"
    }
  }
]