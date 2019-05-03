import React, { useState } from 'react';
import { postMessage } from '../../utils/api.js';

export default function ChatInput(props) {
  const otherUsername = props.recipient ? props.recipient : props.match.params.username;
  
  return (
    <div>
      <hr/>
      <MessageInput {...props} otherUsername={otherUsername}/>
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

    postMessage(props.otherUsername, messageBody).then(() => {
      setIsSending(false);
      setMessageBody('');

      props.recipient && props.history.push('/conversations/' + props.otherUsername);
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
        placeholder={props.otherUsername ? 'Send message to ' + props.otherUsername : ''}
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