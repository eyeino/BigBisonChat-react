import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function conversations(req, res) {
  // If your Access Token is expired and you have a Refresh Token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res, { scopes: ['openid', 'profile', 'email']});
  const response = await fetch('http://localhost:8080/conversations', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  const conversations = await response.json();
  console.log(conversations)

  res.json(conversations);
});