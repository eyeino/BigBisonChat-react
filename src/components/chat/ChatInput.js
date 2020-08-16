import React, { useState } from 'react';
import { postMessage } from '../../utils/api.js';

export default function ChatInput(props) {
  const otherUsername = props.recipient ? props.recipient : props.match.params.username;
  
  return (
    <MessageInput {...props} otherUsername={otherUsername}/>
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
    <form className={`flex justify-between space-x-2 ${props.location.pathname.includes("/conversations") && "mr-2"}`} onSubmit={handleSubmit}>
      <input
        className="bg-gray-100 rounded border w-full shadow p-2"
        id="messageInput"
        onChange={handleChange}
        type="text"
        autoComplete="off"
        value={messageBody}
        placeholder={props.otherUsername ? 'Send message to ' + props.otherUsername : ''}
      />
      <button
        className="bg-red-500 text-white py-1 px-2 rounded shadow-md"
        disabled={!messageBody || isSending}
        type="submit"
        onClick={handleSubmit}>
        Send
      </button>
    </form>
  );
}