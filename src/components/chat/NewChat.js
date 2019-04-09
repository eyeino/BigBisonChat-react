import React, { useEffect, useState } from "react";
import { postMessage } from "../../utils/API";
import { LinkButton } from "../extensions/LinkButton";

export default function NewChat(props) {
  useEffect(() => {
    document.title = props.title;
  });

  const [recipient, setRecipient] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  function handleMessageBodyChange(event) {
    let value = event.target.value;
    setMessageBody(value);
  }

  function handleRecipientChange(event) {
    let value = event.target.value;
    setRecipient(value);
  }

  function handleSubmit(event, callback) {
    event.preventDefault();

    setIsSending(true);

    console.log(recipient, messageBody);

    postMessage(recipient, messageBody).then(() => {
      callback();
    });
  }

  return (
    <div className="new-chat" onSubmit={handleSubmit}>
      <form className="new-chat-form">
        <input
          className="new-chat-input"
          placeholder="Username"
          onChange={handleRecipientChange}
          autoComplete="false"
          type="text"
        />
        <input
          className="new-chat-input"
          placeholder="Message"
          onChange={handleMessageBodyChange}
          autoComplete="false"
          type="text"
        />
        <LinkButton {...props}
          to={"/conversations/" + recipient}
          onClick={handleSubmit}
          disabled={isSending}
          type="button"
        >
          Create Chat!
        </LinkButton>
      </form>
      <p>Tip: Give 'eyeino' a buzz.</p>
    </div>
  );
}