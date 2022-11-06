import Head from "next/head";
import React from "react";

function NotFoundPage() {
  return (
    <>
      <Head>
        <title>BigBisonChat – 404</title>
      </Head>
      <div className="mt-[50vh] flex justify-center">
        <p className="text-2xl">Page not found :(</p>
      </div>
    </>
  );
}

export default NotFoundPage;
