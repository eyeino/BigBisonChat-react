/* eslint no-restricted-globals: 0 */

import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'bigbisonchat.auth0.com',
    clientID: 'mqQZli4ZkGR5eL3r8OT4x7AQBKaIuJtg',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    const LOGIN_SUCCESS_PAGE = "/conversations";
    const LOGIN_FAILURE_PAGE = "/"; 

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
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    location.pathname = "/"
  }
}