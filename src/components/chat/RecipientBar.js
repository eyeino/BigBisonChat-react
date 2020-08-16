import React from "react";
import AsyncSelect from './AsyncSelect';

export function RecipientBar(props) {
  
  const handleChange = (selection) => {
    console.log(selection);
    props.setRecipient(selection.label);
  }

  return (
    <AsyncSelect onChange={handleChange} />
  );
}