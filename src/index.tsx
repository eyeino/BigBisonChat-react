import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Auth from './utils/Auth';
import { BrowserRouter } from 'react-router-dom';
import './tailwind.output.css'

const auth = new Auth();
const state = { auth };

ReactDOM.render(
  <BrowserRouter>
    <App { ...state } />
  </BrowserRouter>,
document.getElementById('root'));
