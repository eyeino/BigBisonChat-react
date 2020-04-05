/* eslint no-restricted-globals: 0 */

import auth0 from 'auth0-js';

const callbackUrl =
  process.env.NODE_ENV === "production"
    ? "https://chat.bigbison.co/callback"
    : "http://localhost:3000/callback";

const returnToUrl =
  process.env.NODE_ENV === "production"
    ? "https://chat.bigbison.co/"
    : "http://localhost:3000/";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'bigbisonchat.auth0.com',
    clientID: 'mqQZli4ZkGR5eL3r8OT4x7AQBKaIuJtg',
    redirectUri: callbackUrl,
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, results) => {
      if (results && results.accessToken && results.idToken) {
        let expiresAt = JSON.stringify((results.expiresIn) * 1000 + new Date().getTime());
        localStorage.setItem("access_token", results.accessToken);
        localStorage.setItem("id_token", results.idToken);
        localStorage.setItem("expires_at", expiresAt);
        location.hash = "";
        location.pathname = "/";
      } else if(err) {
        location.pathname = "/";
        console.log(err);
      }
    })
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout() {
    // clear localStorage of any stored tokens
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    
    this.auth0.logout({
      returnTo: returnToUrl,
      clientID: "mqQZli4ZkGR5eL3r8OT4x7AQBKaIuJtg"
    });
    
  }
}