import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from "./createStore";
import * as serviceWorker from './serviceWorker';
const initialState = {};
const store = configureStore(initialState);
// import('./App').then(App => {
//     console.log(App);
//     ReactDOM.render(<App.default />, document.getElementById('root'));
// });

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
