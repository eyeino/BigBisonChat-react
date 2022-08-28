import { getAccessToken } from "@auth0/nextjs-auth0";
import { ServerSideBigBisonApiService } from "../../../src/utils/api/server";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { path } = req.query;

  if (typeof path === 'string') {
    throw new Error('Path expected to be string array. Next.js filename should follow [...x].ts format.')
  }

  const { accessToken } = await getAccessToken(req, res, { scopes: ['openid', 'profile', 'email']});

  const api = new ServerSideBigBisonApiService(accessToken);

  const bigBisonResponse = await api.proxy({ path: path.join('/'), method: req.method, ...( req.body && { body: req.body })});

  res.json(bigBisonResponse);
}