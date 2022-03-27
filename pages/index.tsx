import React, { useState } from 'react';

import Nav from '../src/components/main/Nav'; // navigation bar
import Home from '../src/components/main/Home'; // login page
// import { ReactComponent as Logo } from "/assets/bison.svg";

function IndexPage(props) {
  // const { auth } = props;
  // const loggedIn = auth.isAuthenticated();

  return (
    <>
      <div className="flex flex-col justify-start sm:h-screen">
        <header className="block sticky top-0 w-full bg-white mb-0 z-50 border-b-2 border-gray-100">
          <Nav />
        </header>
        <main className="sm:overflow-hidden flex flex-col h-full">
            <p>Should redirect to /conversations</p>
            <Home />
            {/* { !loggedIn && <Redirect from="*" to="/" /> } */}
            {/* <Logo className="mx-auto sm:m-auto mt-20 h-48 w-48 fill-current text-gray-200" /> */}
        </main>
      </div>
    </>
  );
}

export default IndexPage;