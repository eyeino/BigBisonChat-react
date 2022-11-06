import { Combobox } from "@headlessui/react";
import React from "react";
import debounceFn from "debounce-fn";
import { ClientSideBigBisonApiService } from "../../utils/api/client";

export function UserSearchBar({
  recipient,
  setRecipient,
}: {
  recipient: string;
  setRecipient: (s: string) => void;
}) {
  const [query, setQuery] = React.useState("");
  const [options, setOptions] = React.useState<
    { value: string; label: string }[]
  >([]);

  const handleInputChange = debounceFn(
    (inputValue: string) => {
      if (!inputValue) {
        setOptions([]);
        setQuery("");
        setRecipient("");
        return;
      }

      setQuery(inputValue);

      const client = new ClientSideBigBisonApiService();

      client.searchUsers(inputValue).then((res) => {
        setOptions(
          res.map((user) => ({
            value: user.user_id,
            label: user.username,
          }))
        );
      });
    },
    { wait: 300 }
  );

  return (
    <Combobox
      value={recipient}
      onChange={(selection) => setRecipient(selection)}
    >
      <Combobox.Input
        className="w-full border shadow-sm p-2 rounded-lg"
        onChange={(event) => handleInputChange(event.target.value)}
        placeholder="Search for a user"
        displayValue={() => recipient ?? query}
      />
      <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {options.length === 0 && (
          <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
            No matching users found. Try searching for 'eyeino'.
          </div>
        )}
        {options.map((selectableUser) => (
          <Combobox.Option
            key={selectableUser.value}
            value={selectableUser.label}
            className={({ active }) =>
              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                active ? "text-white bg-teal-600" : "text-gray-900"
              }`
            }
          >
            {selectableUser.label}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
