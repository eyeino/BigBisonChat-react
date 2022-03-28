import React from "react";

import ConversationList from "../../src/components/conversations/Conversations"; // list of convos
import { useWindowSize } from "../../src/components/hooks/useWindowSize";
import { Bison } from "../../src/components/svg/Bison";

function ConversationsPage() {
  const windowSize = useWindowSize();

  return (
    <>
      {windowSize.width >= 640 && (
        <div className="flex w-full justify-between space-x-2">
          <ConversationList />
          <section className="flex-grow flex flex-col justify-around self-center">
            <Bison className="self-center my-auto text-gray-200 fill-current h-48 w-48" />
          </section>
        </div>
      )}
      {windowSize.width < 640 && <ConversationList />}
    </>
  );
}

export default ConversationsPage;
