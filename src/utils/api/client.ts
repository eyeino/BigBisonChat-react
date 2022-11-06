import ky from "ky";
import { KyInstance } from "ky/distribution/types/ky";
import { Message } from "../../types";

export class ClientSideBigBisonApiService {
  fetcher: KyInstance;

  constructor() {
    this.fetcher = ky.extend({
      prefixUrl: "/api/bigbison",
      retry: {
        limit: 0,
      },
    });
  }

  async getMessages(otherUsername: string) {
    const res = await this.fetcher.get("conversations/" + otherUsername).json();
    return res as Message[];
  }

  async getConversations() {
    try {
      const res = await this.fetcher.get("conversations").json();
      return res;
    } catch (err) {}
  }

  async postMessage(otherUsername: string, messageBody: string) {
    console.log({ otherUsername, messageBody });

    await this.fetcher.post("conversations/" + otherUsername, {
      json: {
        messageBody: messageBody,
      },
    });
  }

  async searchUsers(query: string) {
    return await this.fetcher.get("search/users/" + query).json();
  }
}
