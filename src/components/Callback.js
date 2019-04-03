import React from 'react';

export default function Callback(props) {
  props.auth.handleAuthentication();

  return (
    <div>
      Redirected from Auth0. Loading...
    </div>
  )
}