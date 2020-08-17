import React from 'react';
import PropTypes from 'prop-types';
import fecha from 'fecha';
import EventSource from 'eventsource';

import { getMessages, eventSourceURL } from '../../utils/api';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    // subscribe to eventstream offered by server
    const token = localStorage.getItem("id_token");
    const url = eventSourceURL + this.props.match.params.username;

    const eventSourceInitDict = {
      headers: { authorization: "Bearer " + token }
    };
    this.evtSource = new EventSource(url, eventSourceInitDict);
  }

  componentDidMount() {
    document.title = "BigBisonChat - " + this.props.match.params.username;

    getMessages(this.props.match.params.username).then((res, err) => {
      console.log(res.data);
      this.setState({
        messages: res.data
      });
    });

    // add listener to add messages to chat window upon receipt
    this.evtSource.onmessage = (e) => {
      const eventData = JSON.parse(e.data);
      console.log('new message received:', eventData);
      this.setState(prevState => ({
        messages: [...prevState.messages, eventData],
      }));
    }
  }

  componentWillUnmount() {
    this.evtSource.close();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.username !== this.props.match.params.username) {
      getMessages(this.props.match.params.username).then((res, err) => {
        console.log(res.data);
        this.setState({
          messages: res.data
        }, this.scrollToBottom);
      });
  
      // add listener to add messages to chat window upon receipt
      this.evtSource.onmessage = (e) => {
        const eventData = JSON.parse(e.data);
        console.log('new message received:', eventData);
        this.setState(prevState => ({
          messages: [...prevState.messages, eventData],
        }), this.scrollToBottom());
      }
    }

    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth", alignToTop: true });
  }

  determineEventNameFromUsernames(userOneUsername, userTwoUsername) {
    // create deterministic but unique room name between two users
    return [userOneUsername, userTwoUsername].sort().join("-");
  }

  render() {
    return (
      <div className="flex-grow sm:overflow-y-scroll" style={{ WebkitOverflowScrolling: 'auto' }}>
        <MessageList
          messages={this.state.messages}
          otherUsername={this.props.match.params.username}
        />
        <div
          className="h-16 sm:h-0"
          ref={el => {
            this.messagesEnd = el;
          }}
        />
        { this.props.children }
      </div>
    );
  }
}

function MessageList(props) {
  const { messages, otherUsername } = props;

  return (
    <ol className="m-2 ml-5 flex flex-col">
      {messages &&
        messages.map(message => {
          const chatBubble = (
            <ChatBubble
              key={message.message_id}
              message={message}
              otherUsername={otherUsername}
            />
          );
          return chatBubble;
        })}
    </ol>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.number.isRequired,
      recipient: PropTypes.number.isRequired,
      sender_username: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired
    })
  )
}

function ChatBubble(props) {
  const { sender_username, body } = props.message;
  
  const epochTime = Date.parse(props.message.created_at);
  const timestamp = fecha.format(epochTime, 'MM/DD/YY hh:mmA');
  
  const { otherUsername } = props; 
  const isFromSender = sender_username === otherUsername;

  return (
    <>
      <li className={`max-w-xs hover:text-gray-500 transition-colors ease-out duration-200 delay-500 text-transparent ${isFromSender ? 'self-start text-left' : 'self-end text-right'}`}>
        <p className={`inline-block p-2 shadow rounded-lg w-auto ${isFromSender ? 'bg-gray-200 text-gray-700 rounded-bl-none' : 'bg-red-100 text-red-700 rounded-br-none'}`}>{body}</p>
        <time className="block text-xs">{timestamp}</time>
      </li>
    </>
  )
}

ChatBubble.propTypes = {
  message: PropTypes.shape({
    sender_username: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired
  })
}