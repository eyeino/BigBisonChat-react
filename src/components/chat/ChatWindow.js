import React from 'react';
import PropTypes from 'prop-types';
import fecha from 'fecha';
import EventSource from 'eventsource';

import { getMessages, eventSourceURL } from '../../utils/api';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      otherUsername: this.props.match.params.username
    };

    // subscribe to eventstream offered by server
    const token = localStorage.getItem("id_token");
    const url = eventSourceURL + this.state.otherUsername;

    const eventSourceInitDict = {
      headers: { authorization: "Bearer " + token }
    };
    this.evtSource = new EventSource(url, eventSourceInitDict);
  }

  componentDidMount() {
    document.title = "BigBisonChat - " + this.state.otherUsername;

    getMessages(this.state.otherUsername).then((res, err) => {
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

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  determineEventNameFromUsernames(userOneUsername, userTwoUsername) {
    // create deterministic but unique room name between two users
    return [userOneUsername, userTwoUsername].sort().join("-");
  }

  render() {
    return (
      <div>
        <MessageList
          messages={this.state.messages}
          otherUsername={this.state.otherUsername}
        />
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}

function MessageList(props) {
  const { messages, otherUsername } = props;

  return (
    <ol className="bubble-list">
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
  const directionClass = sender_username === otherUsername ? 'bubble-left' : 'bubble-right';

  return (
    <>
      <li className={`bubble-wrap ${directionClass}`}>
        <div className='bubble-username'>{sender_username}</div>
        <div className='bubble-body'>{body}</div>
        <div className='bubble-timestamp'>{timestamp}</div>
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