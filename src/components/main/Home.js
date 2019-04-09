import React, { useEffect } from 'react';

export default function Home(props) {
  useEffect(() => {
    document.title = props.title
  });

  return (
    <div className='home-container'>
      <button onClick={props.auth.login} className='button'>Log in with Auth0</button>
    </div>
  )
}