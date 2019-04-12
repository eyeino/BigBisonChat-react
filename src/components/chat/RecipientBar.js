import React, { useState } from 'react';

export function RecipientBar(props) {
  return (
    <div className='recipient-wrapper'>
      <div className='recipient-to'>To:</div>
      <RecipientInput></RecipientInput>
      <hr/>
    </div>
  )
}

function RecipientInput(props) {
  const [recipient, setRecipient] = useState("");

  function handleChange(event) {
    let value = event.target.value;
    setRecipient(value);
  }

  return (
    <div
      className="recipient-editable"
      contentEditable="true"
      onChange={handleChange}
    >{recipient}</div>
  );
}