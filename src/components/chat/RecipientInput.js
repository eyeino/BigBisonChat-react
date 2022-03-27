import { Combobox } from "@headlessui/react";
import React from "react";
import { searchUsers } from "../../utils/api.js";
import debounceFn from "debounce-fn";

export function RecipientInput({ recipient, setRecipient }) {
  const [query, setQuery] = React.useState("");
  const [options, setOptions] = React.useState([]);

  const executeQuery = debounceFn(
    (query) => {
      setQuery(query);

      searchUsers(query).then((res) => {
        if (!res) {
          return;
        }

        setOptions(
          res.data.map((user) => ({
            value: user.user_id,
            label: user.username,
          }))
        );
      });
    },
    { wait: 300 }
  );

  const handleChange = (selection) => {
    setRecipient(selection.label);
  };

  return (
    <Combobox value={recipient} onChange={handleChange}>
      <Combobox.Input
        className="w-full border shadow-sm p-2 rounded-lg"
        value={query}
        onChange={(event) => executeQuery(event.target.value)}
        placeholder="Search for a user"
      />
      <Combobox.Options>
        {options.map((selectableUser) => (
          <Combobox.Option
            key={selectableUser.value}
            value={selectableUser.label}
          >
            {selectableUser.label}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
