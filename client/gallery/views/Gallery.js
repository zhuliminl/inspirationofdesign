import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as Status from '../status.js';
import Thumbnail from './Thumbnail.js';

import './style.scss';

class Gallery extends Component {

    componentWillUpdate() {
        const gallery = document.getElementsByClassName('gallery')[0];
        const filter = document.getElementsByClassName('filter')[0];

        // 观察页面等待的确切时机。
        // const pra = document.createElement('p');
        // const text = document.createTextNode('凭这段文本的出现判断当前时机');
        // pra.appendChild(text)
        // filter.appendChild(pra);
        if(gallery) {                                                        // 如果能获取画廊，那就重置边距。首次加载你是获取不到的
            gallery.style.marginTop = '0px';
            const loading = document.getElementsByClassName('loading')[0];
            loading.style.display = "none";
        }
    }

    render() {
        const { status } = this.props;
        switch(status) {
            case Status.LOADING:
                return <div></div>

            case Status.SUCCESS:
                const { inspirations } = this.props;
                return (
                    <ul className="gallery">
                    {
                        inspirations.map((content, i) => {
                            return <Thumbnail
                                        key={ i }
                                        author={ content["author"] }
                                        desc={ content["desc"] }
                                        href={ content["href"] }
                                        src={ content["src"] }
                                        title={ content["title"] }
                                   />
                        })
                    }
                    </ul>
                );

            case Status.FAILURE:
                return <div>加载失败</div>
        }
    }
};

Gallery.propTypes = {
    status: PropTypes.string,
    inspirations: PropTypes.array
}

const mapStateToProps = (state) => {
    const { status, inspirations } = state.gallery;
    if(!inspirations) {
        return { status: status }
    }

    return {
        status: status,
        inspirations: inspirations
    }
};

export default connect(mapStateToProps)(Gallery);
