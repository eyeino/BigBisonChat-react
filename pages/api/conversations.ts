import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function products(req, res) {
  // If your Access Token is expired and you have a Refresh Token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res, { scopes: ['openid']});
  const response = await fetch('http://localhost:8080/conversations', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  const products = await response.json();

  res.status(200).json(products);
});