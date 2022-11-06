import { useRouter } from "next/router";
import React, { useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { ClientSideBigBisonApiService } from "../../utils/api/client";

export function MessageInput({ recipient }: { recipient: string }) {
  const router = useRouter();
  const otherUsername =
    typeof router.query.otherUsername === "string"
      ? router.query.otherUsername
      : router.query.otherUsername?.[0] ?? recipient;

  const [messageBody, setMessageBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [focusedWithin, setFocusedWithin] = useState(false);
  const windowSize = useWindowSize();
  const isFaded = !focusedWithin && windowSize?.width && windowSize.width < 640;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;
    setMessageBody(value);
  }

  function handleSubmit(
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();

    setIsSending(true);

    const client = new ClientSideBigBisonApiService();

    client.postMessage(otherUsername, messageBody).then(() => {
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
