import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import baseurl from './reducer'
const store = createStore(baseurl)
ReactDOM.render(
<LocaleProvider locale={zh_CN}>
    <Provider store={store}>
        <App />
    </Provider>
</LocaleProvider>, document.getElementById('root'));
serviceWorker.unregister();
