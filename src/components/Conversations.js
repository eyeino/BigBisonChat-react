import React from 'react';

export default function Conversations() {
  return (
    <div>
      {conversations.map((conversation) => {
        // TODO: this should be its own component
        return (<div>{conversation.with}</div>)
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
    with: 'Suzanne',
    latestMessage: {
      timestamp: '4/2',
      body: "what's going on?"
    }
  },
  {
    with: 'Suzanne',
    latestMessage: {
      timestamp: '4/2',
      body: "what's going on?"
    }
  },
  {
    with: 'Suzanne',
    latestMessage: {
      timestamp: '4/2',
      body: "what's going on?"
    }
  },
  {
    with: 'Suzanne',
    latestMessage: {
      timestamp: '4/2',
      body: "what's going on?"
    }
  },
]