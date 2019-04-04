import React from 'react';

export default function NewChat() {
  return (
    <div className='new-chat'>
      <input placeholder='Username' />
      <button
      className='button'
      type='submit'>Create Chat</button>
      <p>Tip: No idea who to talk to? Give 'eyeino' a buzz.</p>
    </div>
  )
}