import React, { useState } from 'react';
import { postMessage } from '../../utils/API';
// import { sendMessageToServer } from '../utils/socket';

export default function ChatInput(props) {
  const otherUsername = props.match.params.username;
  
  return (
    <div>
      <hr/>
      <MessageInput otherUsername={otherUsername}/>
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
    // const sent = sendMessageToServer(messageBody);
    // if (sent) {
    //   setMessageBody("");
    //   setIsSending(false);
    // } else {
    // }

    postMessage(props.otherUsername, messageBody).then(() => {
      setIsSending(false);
      setMessageBody('');
    })
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