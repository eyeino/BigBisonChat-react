import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { searchUsers } from '../../utils/api.js';

const promiseOptions = async inputValue => {
  // new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve(filterColors(inputValue));
  //   }, 1000);
  // });
  return await searchUsers(inputValue).then((res, err) => {
    const loadedOptions = res.data.map((user) => ({
      value: user.user_id,
      label: user.username
    }));
    return loadedOptions
  });
}

export default function WithPromises(props) {
    return (
      <AsyncSelect
        onChange={props.onChange}
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        placeholder='To:'
        isSearchable
        noOptionsMessage={() => (`Tip: give 'eyeino' a buzz.`)}
        theme={theme => ({
          ...theme,
          borderRadius: "2px",
          colors: {
            ...theme.colors,
            primary25: "pink",
            primary: "#e80505"
          }
        })}
      />
    );
}