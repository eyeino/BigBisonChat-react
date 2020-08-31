import React, { useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { postMessage } from '../../utils/api';
import { useWindowSize } from '../hooks/useWindowSize';

export function ChatInput(props) {
  const match = useRouteMatch('/conversations/:otherUsername');
  const otherUsername = (match && match.params.otherUsername) || props.recipient;
  const [messageBody, setMessageBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const [focusedWithin, setFocusedWithin] = useState(false);
  const windowSize = useWindowSize();
  const isFaded = !focusedWithin && windowSize.width < 640;

  let history = useHistory();

  function handleChange(event) {
    let value = event.target.value;
    setMessageBody(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsSending(true);

    postMessage(otherUsername, messageBody).then(() => {
      setIsSending(false);
      setMessageBody('');

      props.recipient && history.push('/conversations/' + props.recipient);
    })
  }

  return (
    <form className={`flex justify-between flex-shrink-0 space-x-2 transition-opacity duration-150 ${isFaded ? "opacity-50" : ""}`} onSubmit={handleSubmit}>
      <input
        className="bg-gray-100 border w-full shadow-md p-2 rounded-lg"
        id="messageInput"
        onChange={handleChange}
        onFocus={() => setFocusedWithin(true)}
        onBlur={() => setFocusedWithin(false)}
        type="text"
        autoComplete="off"
        value={messageBody}
        disabled={!otherUsername}
        placeholder={otherUsername ? 'Send message to ' + otherUsername : 'Find someone to message first!'}
      />
      <button
        className="bg-red-500 text-white font-semibold py-1 px-3 sm:px-6 rounded-lg shadow-lg"
        disabled={!messageBody || isSending || !otherUsername}
        type="submit"
        onClick={handleSubmit}>
        Send
      </button>
    </form>
  );
}