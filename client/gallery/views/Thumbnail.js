import React from 'react';
import PropTypes from 'prop-types';

const Thumbnail = ({ author, desc, href, src, title }) => (
    <li>
        <div>
            <h2><a href={ href }>{ title }</a></h2>
            <p>{ desc } <span>{ author }</span></p>
        </div>
        <div>
            <img src={ src } alt={ title }/>
        </div>
    </li>
);

export default Thumbnail;
