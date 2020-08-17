import React, { useEffect } from 'react';
import { pingServer } from '../../utils/api';

export default function Home(props) {
  useEffect(() => {
    document.title = props.title;
  });

  useEffect(() => {
    // ping server to wake it up!
    pingServer();
  }, [])

  return (
    <div className="flex flex-col max-w-2xl m-12 md:mt-12 md:mx-auto space-y-10">
      <div className="flex flex-no-wrap items-center z-10">
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
          Chat with your friends... <span className="text-teal-400">majestically</span>.
        </h1>
      </div>
      <button onClick={props.auth.login} className="self-center bg-red-200 p-3 sm:p-5 text-red-700 font-semibold rounded-lg shadow-lg">
        Login / Register
      </button>
      <div className="text-xl self-center text-center">
        <p>Fun fact: bison can run up to 35 miles per hour.</p>
        <p>A project by <a className="text-red-500" href='https://github.com/iannotian'>@iannotian</a></p>
      </div>
    </div>
  );
}