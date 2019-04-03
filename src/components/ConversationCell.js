import React, { useState, useEffect } from 'react';

export default function ConversationCell() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://randomuser.me/api/')
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json.results[0]);
      setUser(json.results[0]);
    });
  }, []);

  return (
    <div className='conversation-cell'>
      {user &&
      <div>
        <img src={user.picture.thumbnail} />
        <div>{user.login.username}: </div>
        <div>Hey, it was great catching up the other day!
        I've been needing a friend these days!</div>
        <hr/>
      </div>
      }
    </div>
  )
}