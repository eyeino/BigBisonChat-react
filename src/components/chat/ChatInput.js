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
    <form className={`flex justify-between flex-shrink-0 space-x-2`} onSubmit={handleSubmit}>
      <input
        className="bg-gray-100 border w-full shadow-md p-2 rounded-lg"
        id="messageInput"
        onChange={handleChange}
        type="text"
        autoComplete="off"
        value={messageBody}
        disabled={!props.otherUsername}
        placeholder={props.otherUsername ? 'Send message to ' + props.otherUsername : 'Find someone to message first!'}
      />
      <button
        className="bg-red-500 text-white font-semibold py-1 px-3 sm:px-6 rounded-lg shadow-lg"
        disabled={!messageBody || isSending || !props.otherUsername}
        type="submit"
        onClick={handleSubmit}>
        Send
      </button>
    </form>
  );
}