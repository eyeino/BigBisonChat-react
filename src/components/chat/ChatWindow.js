import React from 'react';
import PropTypes from 'prop-types';
import fecha from 'fecha';
import io from 'socket.io-client';

import { getMessages, baseUrl } from '../../utils/api';
import { parseJWTUserInfo } from '../../utils/Auth';

function determineEventName(userOneUsername, userTwoUsername) {
  // create deterministic but unique room name between two users
  return [userOneUsername, userTwoUsername].sort().join("-");
}

function scrollToBottom(ref) {
  ref.current.scrollIntoView({ behavior: "smooth", alignToTop: true });
}

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.messagesEnd = React.createRef();

    const token = localStorage.getItem("id_token");
    this.username = parseJWTUserInfo(token).nickname;
  }

  componentDidMount() {
    document.title = "BigBisonChat - " + this.props.match.params.otherUsername;

    this.socket = io(baseUrl);

    getMessages(this.props.match.params.otherUsername).then((res, err) => {
      this.setState({
        messages: res.data
      });

    });

    // add listener to add messages to chat window upon receipt
    const eventName = determineEventName(this.username, this.props.match.params.otherUsername);
    this.socket.on(eventName, this.payloadHandler);
  }

  componentWillUnmount() {
    this.socket.close();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.otherUsername !== this.props.match.params.otherUsername) {
      // in this case, user switched to a different conversation with another person
      getMessages(this.props.match.params.otherUsername).then((res, err) => {
        this.setState({
          messages: res.data
        }, () => {
          const oldEventName = determineEventName(this.username, prevProps.match.params.otherUsername);
          const newEventName = determineEventName(this.username, this.props.match.params.otherUsername);
          this.socket.off(oldEventName);
          this.socket.on(newEventName, this.payloadHandler);

          scrollToBottom( this.messagesEnd );
        });
      });
    }

    scrollToBottom( this.messagesEnd );
  }

  payloadHandler = payload => {
    this.setState(prevState => ({
      messages: [...prevState.messages, payload],
    }));
  };

  render() {
    return (
      <div className="flex-grow sm:overflow-y-scroll" style={{ WebkitOverflowScrolling: 'auto' }}>
        <ol className="m-2 ml-5 flex flex-col">
          { this.state.messages &&
            this.state.messages.map(message =>
              <ChatBubble
                key={message.message_id}
                message={message}
                otherUsername={this.props.match.params.otherUsername}
              />
          )}
        </ol>
        <div
          className="h-16 sm:h-0"
          ref={ this.messagesEnd }
        />
        { this.props.children }
      </div>
    );
  }
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
        <p className={`inline-block p-2 shadow rounded-lg w-auto ${isFromSender ? 'bg-gray-200 text-gray-700 rounded-bl-none' : 'bg-red-100 text-red-700 rounded-br-none'}`} style={{ wordBreak: 'break-word', hyphens: 'auto' }}>{body}</p>
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