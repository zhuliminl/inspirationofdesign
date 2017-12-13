import React, { Component } from 'react';
import { siteList } from '../../constants.js';
import Link from './Link.js';

import ('./Filter.scss');

class Filter extends Component {

    render() {
        return(
            <ul className="filter">
                {
                    siteList.map((siteName, i) => {
                        return(
                            <Link siteName={ siteName } key={i} id={i}/>
                        );
                    })
                }
            <div></div>
            <i className="loading"></i>
            </ul>
        );
    }
};

export default Filter;
