import React from 'react';

import ConversationList from '../../src/components/conversations/Conversations'; // list of convos
import { useWindowSize } from '../../src/components/hooks/useWindowSize';
// import { ReactComponent as Logo } from "./assets/bison.svg";

function ConversationsPage(props) {
  const { auth } = props;
  const windowSize = useWindowSize();

  return (
    <>
      <div className="flex flex-col justify-start sm:h-screen">
        <main className="sm:overflow-hidden flex flex-col h-full">
          { windowSize.width >= 640 &&
            <div className="flex w-full h-full justify-between space-x-2">
              <ConversationList />
              <section className="flex-grow flex flex-col justify-around self-center">
                {/* <Logo className="self-center my-auto text-gray-200 fill-current h-48 w-48" /> */}
              </section>
            </div>
          }
          { windowSize.width < 640 &&
            <ConversationList />
          }
        </main>
      </div>
    </>
  );
}

export default ConversationsPage;