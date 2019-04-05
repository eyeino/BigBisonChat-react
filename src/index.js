import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Auth from './utils/Auth';
import './index.css';

const auth = new Auth();

let state = {};
window.setState = changes => {
  state = Object.assign({}, state, changes);

  ReactDOM.render(<App {...state} />,
    document.getElementById('root'));
}

let initialState = {
  auth: auth,
}

window.setState(initialState);