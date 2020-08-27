import React, { useEffect } from 'react';
import { pingServer } from '../../utils/api';

export const Home: React.FC<{ auth: any }> = ({ auth }) => {
  useEffect(() => {
    document.title = "BigBisonChat | Chat with your friends... majestically";
  });

  useEffect(() => {
    // ping server to wake it up!
    pingServer();
  }, [])

  return (
    <div className="flex flex-col max-w-2xl m-12 md:mt-12 md:mx-auto space-y-10">
      <div className="flex flex-no-wrap items-center z-10">
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
          Chat with your friends... <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600">majestically.</span>
        </h1>
      </div>
      <button onClick={auth.login} className="self-center bg-gradient-to-b from-red-400 to-red-700 p-3 sm:p-5 text-white font-semibold rounded-lg shadow-xl">
        Login / Register
      </button>
      <div className="text-xl self-center text-center">
        <p>A project by <a className="text-red-500 font-semibold" href='https://github.com/iannotian'>@iannotian</a></p>
      </div>
    </div>
  );
}