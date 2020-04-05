import React from 'react';

export default function Callback(props) {
  props.auth.handleAuthentication();

  return (
    <p>
      Redirected from Auth0. Loading...
    </p>
  )
}