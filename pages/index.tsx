import Head from "next/head";
import React from "react";

function IndexPage() {
  return (
    <div className="mt-[86px] flex flex-col justify-start">
      <Head>
        <title>BigBisonChat</title>
      </Head>
      <main className="sm:overflow-hidden flex flex-col md:mx-10">
        <div className="flex flex-col sm:max-w-2xl md:max-w-3xl m-12 md:mt-12 md:mx-auto space-y-10">
          <div className="flex flex-no-wrap items-center z-10">
            <h1 className="text-5xl leading-20 sm:text-7xl md:text-8xl font-bold">
              Chat with your friends...{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600">
                majestically.
              </span>
            </h1>
          </div>
          <a
            href="/api/auth/login"
            className="self-center bg-gradient-to-r from-teal-400 to-blue-700 py-3 px-12 text-white font-semibold rounded-lg shadow-xl shadow-blue-300"
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
