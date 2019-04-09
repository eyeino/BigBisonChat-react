import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fecha from 'fecha';

import { getMessages } from '../../utils/API';

export default function Chat(props) {
  const [messages, setMessages] = useState([]);
  const otherUsername = props.match.params.username;

  useEffect(() => {
    getMessages(otherUsername).then((res, err) => {
      setMessages(res.data);
    })
  }, []);
  
  return <MessageList messages={messages} otherUsername={otherUsername} />
}

function ChatBubble(props) {
  const { sender_username, body } = props.message;
  
  const epochTime = Date.parse(props.message.created_at);
  const timestamp = fecha.format(epochTime, 'MM/DD/YY hh:mmA');
  
  const { otherUsername } = props; 
  const directionClass = sender_username === otherUsername ? 'bubble-left' : 'bubble-right';

  return (
    <>
      <li className={`bubble-wrap ${directionClass}`}>
        <div className='bubble-username'>{sender_username}</div>
        <div className='bubble-body'>{body}</div>
        <div className='bubble-timestamp'>{timestamp}</div>
      </li>
    </>
  )
}

ChatBubble.propTypes = {
  message: PropTypes.shape({
    sender_username: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired
  })
}

function MessageList(props) {
  const { messages, otherUsername } = props;

  return (
    <ol className='bubble-list'>
      { messages && 
        messages.map((message => {
          const chatBubble = <ChatBubble key={message.message_id} message={message} otherUsername={otherUsername}/>
          return chatBubble
      }))}
    </ol>
  )
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.number.isRequired,
      recipient: PropTypes.number.isRequired,
      sender_username: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired
    })
  )
}