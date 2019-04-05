import React from 'react';
import ConversationCell from './ConversationCell';

export default function Conversations() {
  const body = `Hey, it was great catching up the other day!
  I've been needing a friend these days! Yeah, I know I can
  really talk your ear off sometimes... This is above 100
  characters, isn't it?`

  let username = 'somedude47';
  let avatarUrl = 'https://randomuser.me/api/portraits/men/61.jpg';
  
  // useEffect(() => {
  //   fetch('https://randomuser.me/api/')
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((json) => {
  //       const user = json.results[0];
  //       avatarUrl = user.picture.medium;
  //       username = user.login.username;
  //     });
  // }, []);

  return (
    <div>
      {conversations.map(() => {
        return <ConversationCell username={username}
          body={body}
          avatarUrl={avatarUrl}
        />
      })}
    </div>
  )
}

const conversations = [1, 2, 3, 4, 5, 6, 7, 8, 9];