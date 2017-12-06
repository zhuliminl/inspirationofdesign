import React, { Component } from 'react';

// 按照模块引入
import { view as Filter } from './filter/';
import { view as Gallery } from './gallery/';

class InspirationApp extends Component {
    render() {
        return (
         <div>
            <Filter />
            <Gallery />
         </div>
        );
    }
};

export default InspirationApp;
