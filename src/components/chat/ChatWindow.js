import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// import { getMessages } from '../utils/api';

const dummyBody = `When you buy that first tube of paint, 
it gives you an artist license. All you need is a 
dream in your heart, and an almighty knife. We'll 
throw some old gray clouds in here just sneaking around
 and having fun. God gave you this gift of imagination.  
Use it.`;

const dummySender = 'eyeino';
const dummyTimestamp = '4/5/19 11:21 AM';

const messageGen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const messages = messageGen.map((num) => (
  {
    id: num,
    body: dummyBody,
    sender: dummySender,
    timestamp: dummyTimestamp,
  }
));

export default function Chat() {
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    // getMessages().then((messages) => {
    //   setMessages(messages);
    // })
  }, []);
  
  return <MessageList messages={messages} />
}

function ChatBubble(props) {
  const { sender, body, timestamp } = props.message;

  return (
    <>
      <li className={`bubble-wrap ${props.directionClass}`}>
        <div className='bubble-username'>{sender}</div>
        <div className='bubble-body'>{body}</div>
        <div className='bubble-timestamp'>{timestamp}</div>
      </li>
    </>
  )
}

ChatBubble.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired
  }),
  directionClass: PropTypes.string.isRequired
}

function MessageList(props) {
  const { messages } = props;
  let shouldBeLeft = true;

  return (
    <ol className='bubble-list'>
      { messages && 
        messages.map((message => {
          const bubbleDirectionClass = shouldBeLeft ? 'bubble-left' : 'bubble-right';
          console.log(bubbleDirectionClass);
          const chatBubble = <ChatBubble key={message.id} message={message} directionClass={bubbleDirectionClass} />
          shouldBeLeft = !shouldBeLeft;
          return chatBubble
      }))}
    </ol>
  )
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired
    })
  )
}