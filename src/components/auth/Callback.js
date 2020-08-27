import React from 'react';

export default function Callback(props) {
  props.auth.handleAuthentication();

  return (
    <p className="bg-green-100 text-green-400 p-4 rounded">
      Loading...
    </p>
  )
}