import React from 'react';
import { Link } from 'react-router-dom';
import { dbTimeToHHMMOrDayNameOrDateString } from '../../utils/DateText';

import { ReactComponent as Avatar } from "../assets/avatar.svg";
import { ReactComponent as Arrow } from "../assets/right-arrow.svg";

const messageBodyLimit = 15;

export default function ConversationCell(props) {
  const { username, avatarUrl, body, createdAt, selected } = props;
  const timestamp = dbTimeToHHMMOrDayNameOrDateString(createdAt);

  return (
    <Link to={`/conversations/${username}`}>
      <div className={`flex flex-wrap text-gray-500 justify-between items-center p-4 rounded border-transparent border-l-8 my-2 transition-colors sm:transition-all ease-out duration-150 hover:text-gray-700 hover:border-teal-200 ${selected ? "sm:border-teal-400 sm:shadow-lg" : ""}`}>
        {avatarUrl ? (
          <img className="flex-grow-0 flex-shrink-0 h-12 w-12 mr-2 rounded-full" alt={username} src={avatarUrl} />
        ) : (
          <Avatar
            className={`fill-current flex-grow-0 flex-shrink-0 h-12 w-12 mr-2 ${selected ? "text-teal-400" : ""}`}
          />
        )}
        <div className="">
          <p className={`font-bold text-gray-700 ${ selected ? "text-gray-900" : ""}`}>{username}</p>
          <p className="text-gray-500">
            {body.length > messageBodyLimit
              ? body.substring(0, messageBodyLimit) + "..."
              : body}
          </p>
        </div>
        <Arrow className={`h-4 w-4 ml-auto fill-current ${selected ? "text-teal-400" : ""}`} />
        <time className="w-full text-right font-light text-sm text-gray-500">{timestamp}</time>
      </div>
    </Link>
  );
}