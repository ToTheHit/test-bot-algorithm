import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Pages/Main/App.css'; // This is IMPORTANT import.
import smoothscroll from 'smoothscroll-polyfill';

import connect from '@vkontakte/vkui-connect';
import * as serviceWorker from './serviceWorker';
import AppRouter from './Router';

connect.send('VKWebAppInit', {});

// Added snooth scroll for Safari 6+, IE 9+, Edge 12+, Opera Next
smoothscroll.polyfill();

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
