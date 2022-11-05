import got, { Got } from "got";

export const bigBisonBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://bbc.up.railway.app"
    : "http://localhost:8080";

export class ServerSideBigBisonApiService {
  fetcher: Got;

  constructor(auth0AccessToken: string) {
    this.fetcher = got.extend({
      headers: { Authorization: "Bearer " + auth0AccessToken },
      prefixUrl: bigBisonBaseUrl,
    });
  }

  async proxy({ path, body, method }) {
    return await this.fetcher(path, { json: body, method }).json();
  }
}
