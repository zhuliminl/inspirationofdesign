import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Link = ({ onToggleSite, siteName, active }) => (
    <li><a href="#" onClick={ (e) => {
                        e.preventDefault();
                        onToggleSite();
                    } }>{ siteName }</a></li>
);

Link.propTypes = {
    onToggleSite: PropTypes.func,
    siteName: PropTypes.string,
    active: PropTypes.bool
};

export default Link;
