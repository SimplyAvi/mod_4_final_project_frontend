import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
// import registerServiceWorker from './registerServiceWorker';
import { API_WS_ROOT } from './constants/index'
import ActionCableProvider from 'react-actioncable-provider'

// ActionCableProvider - needs to wrap everything so that the <Cable></Cable> and <ActionCableConsumer></ActionCableConsumer> can be used  

ReactDOM.render(
    <ActionCableProvider url={API_WS_ROOT}>
        <App />
    </ActionCableProvider>,
    document.getElementById('root')

);























// ServiceWorker();   

// WHAT IS registerServiceWorker??

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


// commented out service worker stuff, WHAT IS THIS?
// serviceWorker.unregister();
