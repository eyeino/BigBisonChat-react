import React, { useEffect } from 'react';

export default function NewChat(props) {
  useEffect(() => (document.title = props.title));
  
  return (
    <div className='new-chat'>
      <input className='new-chat-input' placeholder='Username' autoComplete='false' type='text' />
      <input className='new-chat-input' placeholder='Message' autoComplete='false' type='text' />
      <button
      className='button'
      type='submit'>Create Chat</button>
      <p>Tip: Give 'eyeino' a buzz.</p>
    </div>
  )
}