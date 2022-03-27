import axios from "axios";
import ky from "ky";

const bigBisonKyInstanceFactory = (authToken) =>
  ky.extend({
    headers: { authorization: "Bearer" + authToken },
  });

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://bigbisonchat.herokuapp.com"
    : "http://localhost:8080";

export const fetcher = (url, authToken) =>
  bigBisonKyInstanceFactory(authToken)
    .request({ url, baseURL: "api/bigbison", method: "get" })
    .then((res) => res.data);

export class BigBisonApiService {
  constructor(authToken) {
    this.ky = bigBisonKyInstanceFactory(authToken);
  }

  async proxy({ path, body, method }) {
    return await this.ky.get(baseUrl + path, { body, method });
  }
}

export class BigBisonProxyApiService {
  constructor() {
    this.ky = ky.create();
    this.baseUrl = "api/bigbison";
  }

  async getMessages(otherUsername) {
    try {
      const res = await this.ky.get(
        this.baseUrl + "/conversations/" + otherUsername
      );
      return res;
    } catch (err) {}
  }

  async getConversations(user) {
    try {
      const res = await this.ky.get(this.baseUrl + "/conversations/");
      return res;
    } catch (err) {}
  }

  async postMessage(otherUsername, messageBody) {
    try {
      await this.ky.post(this.baseUrl + "/conversations/" + otherUsername, {
        messageBody: messageBody,
      });
    } catch (err) {}
  }

  async searchUsers(usernameQuery) {
    try {
      const res = await this.ky.get(
        this.baseUrl + "/search/users/" + usernameQuery
      );
      return res;
    } catch (err) {}
  }

  async pingServer() {
    return await axios.get(this.baseUrl + "/ping");
  }
}
