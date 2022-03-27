// @ts-check

import { Combobox } from "@headlessui/react";
import React from "react";
import { searchUsers } from "../../utils/api.js";

export function RecipientInput({ recipient, setRecipient }) {
  const [query, setQuery] = React.useState("");
  const [options, setOptions] = React.useState([]);

  function executeQuery(query) {
    searchUsers(query).then((res) => {
      setOptions(
        res.data.map((user) => ({
          value: user.user_id,
          label: user.username,
        }))
      );
    });
  }

  const handleChange = (selection) => {
    setRecipient(selection.label);
  };

  return (
    <Combobox value={recipient} onChange={handleChange}>
      <Combobox.Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="To"
      />
      <Combobox.Options>
        {options.map((person) => (
          <Combobox.Option key={person} value={person}>
            {person}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
