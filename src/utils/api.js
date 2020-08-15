import axios from 'axios';

const token = localStorage.getItem("id_token");
axios.defaults.headers.common['authorization'] = 'Bearer ' + token;

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://bigbisonchat.herokuapp.com"
    : "http://localhost:8080";

export const eventSourceURL = baseUrl + '/eventstream/'

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
  try {
    await axios.post(baseUrl + '/conversations/' + otherUsername,
      { messageBody: messageBody });
  } catch(err) {
    console.log(err);
  }
}

export async function searchUsers(usernameQuery) {
  try {
    const res = await axios.get(baseUrl + '/search/users/' + usernameQuery);
    return res
  } catch(err) {
    console.log(err);
  }
}

export async function pingServer() {
  return await axios.get(baseUrl + '/ping');
}