import React from 'react';

export default function Home(props) {
  return (
    <div className='home-container'>
      <button onClick={props.auth.login} className='button'>Log in with Auth0</button>
    </div>
  )
}