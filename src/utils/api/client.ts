import ky from "ky";
import { KyInstance } from "ky/distribution/types/ky";
import { Conversation, Message, User } from "../../types";

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

  async getMessages(otherUsername: string): Promise<Message[]> {
    const res = await this.fetcher.get("conversations/" + otherUsername).json();
    return res as Message[];
  }

  async getConversations(): Promise<Conversation[]> {
    const res = await this.fetcher.get("conversations").json();
    return res as Conversation[];
  }

  async postMessage(otherUsername: string, messageBody: string): Promise<void> {
    console.log({ otherUsername, messageBody });

    await this.fetcher.post("conversations/" + otherUsername, {
      json: {
        messageBody: messageBody,
      },
    });
  }

  async searchUsers(query: string) {
    const res = await this.fetcher.get("search/users/" + query).json();
    return res as User[];
  }
}
