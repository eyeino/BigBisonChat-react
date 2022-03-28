import React from "react";
import { dbTimeToHHMMOrDayNameOrDateString } from "../../utils/DateText";
import Link from "next/link";

const messageBodyLimit = 15;

export default function ConversationCell(props) {
  const { username, avatarUrl, body, createdAt, selected } = props;
  const timestamp = dbTimeToHHMMOrDayNameOrDateString(createdAt);

  return (
    <Link href={`/conversations/${username}`}>
      <div
        className={`flex flex-wrap text-gray-500 justify-between items-center p-4 rounded-lg border-transparent border-l-8 mr-2 my-2 transition-colors sm:transition-all ease-out duration-150 hover:text-gray-700 hover:border-teal-200 hover:bg-gray-100 ${
          selected
            ? "sm:border-teal-400 bg-gray-100 shadow-md hover:sm:border-teal-400"
            : ""
        }`}
      >
        {avatarUrl && (
          <img
            className="flex-grow-0 flex-shrink-0 h-12 w-12 mr-2 rounded-full"
            alt={username}
            src={avatarUrl}
          />
        )}
        <div className="">
          <p
            className={`font-bold text-gray-700 ${
              selected ? "text-gray-900" : ""
            }`}
          >
            {username}
          </p>
          <p className="text-gray-500">
            {body.length > messageBodyLimit
              ? body.substring(0, messageBodyLimit) + "..."
              : body}
          </p>
        </div>
        {/* <Arrow
          className={`h-4 w-4 ml-auto fill-current ${
            selected ? "text-teal-400" : ""
          }`}
        /> */}
        <time className="w-full text-right font-light text-sm text-gray-500">
          {timestamp}
        </time>
      </div>
    </Link>
  );
}
