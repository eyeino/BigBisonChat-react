import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getMessages } from '../utils/api';

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages().then((messages) => {
      setMessages(messages);
    })
  }, []);
  
  return (
    <div>
      <MessageList messages={messages} />
    </div>
  )
}

function Message(props) {
  const { sender, body, timestamp } = props.message;

  return (
    <li>
      <div>{sender}:</div>
      <div>{timestamp}</div>
      <div>{body}</div>
    </li>
  )
}

Message.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired
  })
}

function MessageList(props) {
  const { messages } = props;
  
  return (
    <ul>
      { messages && 
        messages.map((message => {
          return (<Message key={message.timestamp} message={message} />)
      }))}
    </ul>
  )
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired
    })
  )
}