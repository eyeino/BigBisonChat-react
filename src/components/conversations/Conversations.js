import React from 'react';

import ConversationCell from './ConversationCell';
import { fetcher } from '../../utils/api.js';

import useSWR from 'swr';
import { useRouteMatch } from 'react-router-dom';

export default function Conversations(props) {
  document.title = props.title;

  const match = useRouteMatch('/conversations/:otherUsername');
  const { data, error } = useSWR(`/conversations`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading</div>;

  return (
    <section className="flex-grow-0 sm:max-w-xs flex-shrink-0 sm:border-r-2 sm:border-gray-100 overflow-y-auto sm:ml-2">
      { data
          .reduce((unique, item) => {
            return unique.includes(item.other_username) ? unique : [...unique, item, item.other_username]
          }, [])
          .filter(item => typeof item === 'object')
          .map(convo => {

          return (
            <ConversationCell
              key={convo.other_username}
              username={convo.other_username}
              body={convo.body}
              avatarUrl={convo.avatar_url}
              createdAt={convo.created_at}
              selected={match && match.params.otherUsername === convo.other_username}
            />
          );
        })}
      { data.length === 0 && (
        <div>
          <p>Welcome! You don't have any conversations yet! </p>
          <p>Press 'New' and start talking!</p>
        </div>
      )}
    </section>
  );
}