import React from "react";
import AsyncSelect from './AsyncSelect';

export function RecipientBar(props) {
  
  const handleChange = (selection) => {
    console.log(selection);
    props.setRecipient(selection.label);
  }

  return (
    <div className="recipient-wrapper">
      <AsyncSelect className='recipient-search' onChange={handleChange} />
    </div>
  );
}