import React, { useState } from 'react';

import Nav from '../src/components/main/Nav'; // navigation bar
import Callback from '../src/components/auth/Callback'; // callback url for Auth0
// import { ReactComponent as Logo } from "./assets/bison.svg";

function CallbackPage(props) {
  const { auth } = props;

  return (
    <>
      <div className="flex flex-col justify-start sm:h-screen">
        <header className="block sticky top-0 w-full bg-white mb-0 z-50 border-b-2 border-gray-100">
          <Nav auth={auth} />
        </header>
        <main className="sm:overflow-hidden flex flex-col h-full">
          <Callback auth={auth} />
        </main>
      </div>
    </>
  );
}

export default CallbackPage;