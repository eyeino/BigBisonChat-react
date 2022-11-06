import ky from "ky";
import { KyInstance } from "ky/distribution/types/ky";

interface Conversation {
  other_username: string;
  body: string;
  avatar_url: string;
  created_at: string;
}

interface Message {
  message_id: string;
  sender_username: string;
  body: string;
  created_at: string;
  otherUsername: string;
}
export class ClientSideBigBisonApiService {
  fetcher: KyInstance;

  constructor() {
    this.fetcher = ky.extend({
      prefixUrl: "/api/bigbison",
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
    return await this.fetcher.get("search/users/" + query).json();
  }
}
