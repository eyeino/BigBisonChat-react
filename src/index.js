import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

let state = {};
window.setState = changes => {
  state = Object.assign({}, state, changes);

  ReactDOM.render(<App {...state} />, document.getElementById('root'));
}

let initialState = {
  name: 'Ian'
}

window.setState(initialState);