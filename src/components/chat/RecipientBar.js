import React, { useState } from 'react';
import Select from 'react-select';

export function RecipientBar(props) {
  return (
    <div className='recipient-wrapper'>
      <div className='recipient-to'>To:</div>
      <RecipientInput />
      <hr/>
    </div>
  )
}

function RecipientInput(props) {
  const [recipient, setRecipient] = useState(null);

  function handleChange(event) {
    let value = event.target.value;
    setRecipient(value);
  }

  const color = recipient ? 'transparent' : 'linear-gradient(#FF4136, #e80505)'

  return (
    <Select
    label="Single select"
    theme={(theme) => ({
      ...theme,
      borderRadius: '2px',
      colors: {
      ...theme.colors,
        primary25: 'pink',
        primary: '#e80505'
      },
    })}
  />
  );
}

{/* <div
      className="recipient-editable"
      contentEditable="true"
      onInput={handleChange}
      style={{ backgroundImage: color }}
    >{recipient}</div> */}