import React from "react";

import Home from "../src/components/main/Home";

function IndexPage(props) {
  return (
    <>
      <div className="flex flex-col justify-start sm:h-screen">
        <main className="sm:overflow-hidden flex flex-col">
          <Home />
        </main>
      </div>
    </>
  );
}

export default IndexPage;
