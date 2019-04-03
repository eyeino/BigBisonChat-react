import axios from 'axios';

export async function getMessages() {
  const response = await axios.get('http://localhost:8080/chat')
  return response.data
}