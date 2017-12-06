import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchInspiration, toggleSite } from '../actions.js';
import Link from './Link.js';


class Filter extends Component {

    componentDidMount() {
        // window.addEventListener('load', this.handleLoad);            // 这样无法加载从 props 传来的函数
        this.handleLoad();
    }

    handleLoad() {
        const { siteList } = this.props;
        const siteNames = siteList.map((item) => item["name"]);
        this.props.onWindowLoad(siteNames);
    }

    render() {
        const { siteList, onToggleSite } = this.props;
        return(
            <div>
                <ul>
            {
                siteList.map((item) => (
                    <Link
                        key={ item.name }
                        siteName={ item.name }
                        active={ item.active }
                        onToggleSite={ () => onToggleSite(item.name, item.active) }
                    />
                ))
            }
                </ul>
            </div>
        );
    }
};

Filter.propTypes = {
    siteList: PropTypes.array.isRequired,
    onToggleSite: PropTypes.func,
    onWindowLoad: PropTypes.func
};

const mapStateToProps = (state) => {
    const { filter } = state;
    return {
        siteList: filter.siteList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onWindowLoad: (siteNames) => {
            siteNames.map((name) => {
                dispatch(fetchInspiration(name));
            })
        },
        onToggleSite: (siteName, active) => {
            dispatch(toggleSite(siteName, active))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
