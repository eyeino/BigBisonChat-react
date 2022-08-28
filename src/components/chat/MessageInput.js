// @ts-check
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { ClientSideBigBisonApiServiceInstance } from "../../utils/api/client";

export function MessageInput({ recipient }) {
  const router = useRouter();
  const otherUsername = router.query.otherUsername ?? recipient;

  const [messageBody, setMessageBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [focusedWithin, setFocusedWithin] = useState(false);
  const windowSize = useWindowSize();
  const isFaded = !focusedWithin && windowSize.width < 640;

  function handleChange(event) {
    let value = event.target.value;
    setMessageBody(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsSending(true);

    ClientSideBigBisonApiServiceInstance.postMessage(
      otherUsername,
      messageBody
    ).then(() => {
      setIsSending(false);
      setMessageBody("");

      recipient && router.push("/conversations/" + recipient);
    });
  }

  return (
    <form
      className={`w-full flex justify-between space-x-2 backdrop-blur-sm duration-150 ${
        isFaded ? "opacity-50" : ""
      }`}
      onSubmit={handleSubmit}
    >
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
        placeholder={
          otherUsername
            ? "Send message to " + otherUsername
            : "Find someone to message first!"
        }
      />
      <button
        className="bg-red-500 text-white font-semibold py-1 px-3 sm:px-6 rounded-lg shadow-lg"
        disabled={!messageBody || isSending || !otherUsername}
        type="submit"
        onClick={handleSubmit}
      >
        Send
      </button>
    </form>
  );
}
