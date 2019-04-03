import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getMessages } from '../utils/api';
import { sendMessageToServer } from '../utils/socket';

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
      <MessageInput />
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

function MessageInput(props) {
  const [messageBody, setMessageBody] = useState('');
  const [isSending, setIsSending] = useState(false);

  function handleChange(event) {
    let value = event.target.value;
    setMessageBody(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsSending(true);
    // async, if message is successfully sent
    const sent = sendMessageToServer(messageBody);
    if (sent) {
      setMessageBody('');
      setIsSending(false);
    } else {
      
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id='messageInput'
        onChange={handleChange}
        type='text'
        autoComplete='off'
        value={messageBody}
      />
      <button
        className='button'
        disabled={!messageBody || isSending}
        type='submit'>
        Send
      </button>
    </form>
  )
}