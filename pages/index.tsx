import React from 'react';

import Home from '../src/components/main/Home'; // login page
// import { ReactComponent as Logo } from "/assets/bison.svg";

function IndexPage(props) {
  return (
    <>
      <div className="flex flex-col justify-start sm:h-screen">
        <main className="sm:overflow-hidden flex flex-col h-full">
            <Home />
            {/* { !loggedIn && <Redirect from="*" to="/" /> } */}
            {/* <Logo className="mx-auto sm:m-auto mt-20 h-48 w-48 fill-current text-gray-200" /> */}
        </main>
      </div>
    </>
  );
}

export default IndexPage;