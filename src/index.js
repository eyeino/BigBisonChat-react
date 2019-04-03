import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

let state = {};
window.setState = changes => {
  state = Object.assign({}, state, changes);

  ReactDOM.render(<App {...state} />, document.getElementById('root'));
}

let initialState = {
  name: 'Ian',
  loggedIn: true
}

window.setState(initialState);