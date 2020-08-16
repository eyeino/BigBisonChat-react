import React from 'react';
import { Link } from 'react-router-dom';
import { dbTimeToHHMMOrDayNameOrDateString } from '../../utils/DateText';

import { ReactComponent as Avatar } from "../assets/avatar.svg";
import { ReactComponent as Arrow } from "../assets/right-arrow.svg";

const messageBodyLimit = 50;

export default function ConversationCell(props) {
  const { username, avatarUrl, body, createdAt, selected } = props;
  const timestamp = dbTimeToHHMMOrDayNameOrDateString(createdAt);
  
  return (
    <Link to={`/conversations/${username}`}>
      <div className={`flex flex-wrap justify-between items-center p-4 rounded border-l-8 border-transparent my-2 ${selected ? "text-black border-red-600 shadow-lg" : ""}`}>
        {avatarUrl ? (
          <img className="flex-grow-0 flex-shrink-0 h-12 w-12 mr-2 rounded-full" alt={username} src={avatarUrl} />
        ) : (
          <Avatar
            className={`text-gray-500 fill-current flex-grow-0 flex-shrink-0 h-12 w-12 mr-2 ${selected ? "text-red-400" : ""}`}
          />
        )}
        <div className="">
          <p className="font-bold">{username}</p>
          <p className="text-gray-500">
            {body.length > messageBodyLimit
              ? body.substring(0, messageBodyLimit) + "..."
              : body}
          </p>
        </div>
        <Arrow className="h-4 w-4 ml-auto" />
        <time className="w-full text-right text-gray-500 font-light text-sm">{timestamp}</time>
      </div>
    </Link>
  );
}