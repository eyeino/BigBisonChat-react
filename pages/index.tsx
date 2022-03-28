import React from "react";
import { ClientSideBigBisonApiServiceInstance } from "../src/utils/api/client";

function IndexPage(props) {
  React.useEffect(() => {
    document.title = props.title;
  });

  React.useEffect(() => {
    // ping server to wake it up!
    ClientSideBigBisonApiServiceInstance.pingServer();
  }, []);

  return (
    <div className="flex flex-col justify-start">
      <main className="sm:overflow-hidden flex flex-col">
        <div className="flex flex-col max-w-2xl m-12 md:mt-12 md:mx-auto space-y-10">
          <div className="flex flex-no-wrap items-center z-10">
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
              Chat with your friends...{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600">
                majestically.
              </span>
            </h1>
          </div>
          <a
            href="/api/auth/login"
            className="self-center bg-gradient-to-r from-teal-400 to-blue-700 p-3 px-5 text-white font-semibold rounded-lg shadow-lg"
          >
            Login
          </a>
          <div className="text-xl self-center text-center">
            <p>
              A project by{" "}
              <a
                className="text-red-500 font-semibold"
                href="https://iannotian.com/"
              >
                @iannotian
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default IndexPage;
