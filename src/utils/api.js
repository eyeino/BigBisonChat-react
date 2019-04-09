import axios from 'axios';

const token = localStorage.getItem("id_token");
axios.defaults.headers.common['authorization'] = 'Bearer ' + token;

// const baseUrl = 'https://bigbisonchat.herokuapp.com';
const baseUrl = 'http://localhost:8080';

export async function getMessages(otherUsername) {
  try {
    const res = await axios.get(baseUrl + '/conversations/' + otherUsername);
    return res
  } catch(err) {
    console.log(err);
  }
}

export async function getConversations(user) {
  try {
    const res = await axios.get(baseUrl + '/conversations/');
    return res
  } catch(err) {
    console.log(err);
  }
}

export async function postMessage(otherUsername, messageBody) {
  console.log(otherUsername, messageBody);
  
  try {
    await axios.post(baseUrl + '/conversations/' + otherUsername,
      { messageBody: messageBody });
  } catch(err) {
    console.log(err);
  }
}