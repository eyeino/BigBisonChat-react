import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'bigbisonchat.auth0.com',
    clientID: 'mqQZli4ZkGR5eL3r8OT4x7AQBKaIuJtg',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}