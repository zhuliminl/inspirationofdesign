import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';             // 容器引入

import './src/style.css';

import App from './InspirationApp.js';
import store from './Store.js';

ReactDOM.render(
        <Provider store={ store }>
            <App />

        </Provider>
    , document.getElementById('root'));

// 注意 InspirationApp.js 和 index.js 文件的关系。在根目录创建一个以app名字命名的文件，怎么看都是舒服的
