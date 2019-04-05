import React, { useState } from 'react';
import { sendMessageToServer } from '../utils/socket';

export default function ChatInput() {
  return (
    <div>
      <hr/>
      <MessageInput />
    </div>
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
      setMessageBody("");
      setIsSending(false);
    } else {
    }
  }

  return (
    <form className='chat-form' onSubmit={handleSubmit}>
      <input
        className="chat-input"
        id="messageInput"
        onChange={handleChange}
        type="text"
        autoComplete="off"
        value={messageBody}
      />
      <button
        className="chat-submit-button"
        disabled={!messageBody || isSending}
        type="submit"
        onClick={handleSubmit}>
        <span role='img' aria-label='message bubble'>💬</span>
        </button>
    </form>
  );
}