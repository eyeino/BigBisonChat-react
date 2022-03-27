import { getAccessToken } from "@auth0/nextjs-auth0";
import { BigBisonApiService } from "../../../src/utils/api";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('called api')
  const { path } = req.query;

  if (typeof path === 'string') {
    throw new Error('Path expected to be string array.')
  }


  const { accessToken } = await getAccessToken(req, res);

  const api = new BigBisonApiService(accessToken);

  const stringPath = '/' + path.join('/');

  const bigBisonResponse = await (await api.proxy({ path: stringPath, method: req.method, body: req.body})).json();
	
  console.log(bigBisonResponse)

  res.json(bigBisonResponse);
}