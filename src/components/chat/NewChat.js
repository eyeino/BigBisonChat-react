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
    <div>
    </div>
  );
}