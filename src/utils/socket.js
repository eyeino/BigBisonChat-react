import io from 'socket.io-client';
const socket = io('http://localhost:8080');

socket.on('newMessage', (messageData) => {
  console.log(messageData);
})

export function sendMessageToServer(sender, messageBody) {
  socket.emit('newMessage', { sender, body: messageBody });
  console.log(`Sending message with body: ${messageBody}`);
  // Dummy bool to tell client that message was sent successfully
  return true;
}