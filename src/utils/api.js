import axios from "axios";

// const token = window.localStorage.getItem("id_token");
// axios.defaults.headers.common["authorization"] = "Bearer " + token;

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://bigbisonchat.herokuapp.com"
    : "http://localhost:8080";

export const fetcher = (url) =>
  axios
    .request({ url, baseURL: baseUrl, method: "get" })
    .then((res) => res.data);

export async function getMessages(otherUsername) {
  try {
    const res = await axios.get(baseUrl + "/conversations/" + otherUsername);
    return res;
  } catch (err) {}
}

export async function getConversations(user) {
  try {
    const res = await axios.get(baseUrl + "/conversations/");
    return res;
  } catch (err) {}
}

export async function postMessage(otherUsername, messageBody) {
  try {
    await axios.post(baseUrl + "/conversations/" + otherUsername, {
      messageBody: messageBody,
    });
  } catch (err) {}
}

export async function searchUsers(usernameQuery) {
  try {
    const res = await axios.get(baseUrl + "/search/users/" + usernameQuery);
    return res;
  } catch (err) {}
}

export async function pingServer() {
  return await axios.get(baseUrl + "/ping");
}
