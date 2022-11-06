import ky from "ky";
import { KyInstance } from "ky/distribution/types/ky";

export class ClientSideBigBisonApiService {
  fetcher: KyInstance;

  constructor() {
    this.fetcher = ky.extend({
      prefixUrl: "/api/bigbison",
    });
  }

  async getMessages(otherUsername: string) {
    try {
      const res = await this.fetcher
        .get("conversations/" + otherUsername)
        .json();
      return res;
    } catch (err) {}
  }

  async getConversations() {
    try {
      const res = await this.fetcher.get("conversations").json();
      return res;
    } catch (err) {}
  }

  async postMessage(otherUsername: string, messageBody) {
    console.log({ otherUsername, messageBody });

    try {
      await this.fetcher
        .post("conversations/" + otherUsername, {
          json: {
            messageBody: messageBody,
          },
        })
        .json();
    } catch (err) {}
  }

  async searchUsers(query: string) {
    try {
      const res = await this.fetcher.get("search/users/" + query).json();
      return res;
    } catch (err) {}
  }
}
