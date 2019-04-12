import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Avatar } from "../assets/avatar.svg";
import { ReactComponent as Arrow } from "../assets/right-arrow.svg";

const messageBodyLimit = 60;

export default function ConversationCell(props) {
  const { username, avatarUrl, body } = props;

  return (
    <div>
      {username &&
        <Link to={`/conversations/${username}`}>
          <div className='conversation-cell'>
            {
              avatarUrl ? 
              <img className='conversation-avatar' alt={username} src={avatarUrl} />
              :
              <Avatar className='conversation-avatar' style={{ borderRadius: 0, transform: 'scale(0.8)' }}/>
            }
            <div className='conversation-name'>{username}</div>
            <div className='conversation-body'>{body.length > messageBodyLimit ? body.substring(0, messageBodyLimit) + '...' : body}</div>
            <Arrow className='conversation-arrow' />
          </div>
        </Link>
      }
      <hr/>
    </div>
  )
}