import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ConversationCell() {
  const [user, setUser] = useState(null);
  const body = `Hey, it was great catching up the other day!
  I've been needing a friend these days! Yeah, I know I can
  really talk your ear off sometimes... This is above 100
  characters, isn't it?`

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
    <div>
      {user &&
        <Link to='/chat'>
          <div className='conversation-cell'>
            <img className='conversation-avatar' alt={user.login.username} src={user.picture.medium} />
            <div className='conversation-name'>{user.login.username}</div>
            <div className='conversation-body'>{body.length > 80 ? body.substring(0, 80) + '...' : body}</div>
          </div>
        </Link>
      }
    </div>
  )
}