import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as Status from '../../filter/status.js';
import Thumbnail from './Thumbnail.js';

class Gallery extends Component {
    render() {
        const { status } = this.props;
        switch(status) {
            case Status.LOADING: {
                return <div>正在加载中......</div>
            }
            case Status.SUCCESS: {
                const { inspirations } = this.props;
                console.log(inspirations)
                return (<div>
                            {
                                inspirations.map((inspiration) => {
                                    return (inspiration["contents"].map((item) => {
                                        return (<Thumbnail
                                                    key={ item.src }
                                                    title={ item.title }
                                                    author={ item.author }
                                                    desc={ item.desc }
                                                    src={ 'http://'.concat(item.src) }
                                                    href={ item.href }
                                                />);
                                    }));
                                })
                            }
                        </div>);
            }
            case Status.LOADING: {
                return;
            }
        }
    }
};

const mapStateToProps = (state) => {
    const { status } = state.filter;
    switch (status) {
        case Status.LOADING:
            return { status: status };
        case Status.SUCCESS:
            return {
                status: status,
                inspirations: state.filter.siteList
            }
    }
};


export default connect(mapStateToProps)(Gallery);
