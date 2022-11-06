import React from "react";
import { dbTimeToHHMMOrDayNameOrDateString } from "../../utils/DateText";
import Link from "next/link";

const messageBodyLimit = 70;

interface Props {
  username: string;
  avatarUrl: string;
  body: string;
  createdAt: string;
  selected: boolean;
}

export default function ConversationCell({
  username,
  avatarUrl,
  body,
  createdAt,
  selected,
}: Props) {
  const timestamp = dbTimeToHHMMOrDayNameOrDateString(createdAt);

  return (
    <Link href={`/conversations/${username}`}>
      <div
        className={`w-full space-x-4 flex justify-start items-center cursor-pointer text-gray-500 p-2 rounded-lg border-transparent border-l-8 transition-colors sm:transition-all ease-out duration-150 hover:text-gray-700 hover:border-teal-200 hover:bg-gray-100 ${
          selected
            ? "sm:border-teal-400 bg-gray-100 shadow-md hover:sm:border-teal-400"
            : ""
        }`}
      >
        {avatarUrl ? (
          <img
            className="flex-grow-0 flex-shrink-0 h-12 w-12 rounded-full"
            alt={username}
            src={avatarUrl}
          />
        ) : (
          <div className="flex-grow-0 flex-shrink-0 h-12 w-12 border-2 text-center pt-1 rounded-full">
            <span className="text-2xl">{username[0]}</span>
          </div>
        )}
        <div className="">
          <p
            className={`font-bold text-gray-700 ${
              selected ? "text-gray-900" : ""
            }`}
          >
            {username}
          </p>
          <p className="text-xs text-gray-500">
            {body.length > messageBodyLimit
              ? body.substring(0, messageBodyLimit) + "..."
              : body}
          </p>
          <time className="w-full font-light text-xs text-gray-500">
            {timestamp}
          </time>
        </div>
        {/* <Arrow
          className={`h-4 w-4 ml-auto fill-current ${
            selected ? "text-teal-400" : ""
          }`}
        /> */}
      </div>
    </Link>
  );
}
