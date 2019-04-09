import React from 'react';
import { Link } from 'react-router-dom';

export default function ConversationCell(props) {
  const { username, avatarUrl, body } = props;
  
  return (
    <div>
      {username &&
        <Link to={`/conversations/${username}`}>
          <div className='conversation-cell'>
            <img className='conversation-avatar' alt={username} src={avatarUrl} />
            <div className='conversation-name'>{username}</div>
            <div className='conversation-body'>{body.length > 80 ? body.substring(0, 80) + '...' : body}</div>
          </div>
        </Link>
      }
      <hr/>
    </div>
  )
}

// TODO: add prop types and default icon for user if gravatar fails