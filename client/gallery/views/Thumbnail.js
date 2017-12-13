import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Thumbnail extends Component {
    handleMediaLoad(e) {
        const media = e.target;
        media.style.filter = "none";                                            // 加载完成了就取消模糊
    }

    render() {
        const { author, desc, href, src, title } = this.props;
        const isVideo = src.search(/.mp4/) === -1 ? false : true;               // 判断是不是视频格式
        return(
            <li className="gallery__item card">
                <div className="card__info">
                    <h2 className="card__title"><a href={ href }>{ title }</a></h2>
                    <p className="card__author">by { author }</p>
                    <p className="card__desc">{ desc }</p>
                </div>
                <div className="card__media">
                    <a href={ href } target="_blank">
                    {
                        isVideo ? <video
                                    onLoadedData={ this.handleMediaLoad.bind(this) }
                                    src={ src }
                                    autoPlay="autoplay"
                                    loop="loop"/>
                                : <img
                                    onLoad={ this.handleMediaLoad.bind(this) }
                                    src={ src }/>
                    }
                    </a>
                </div>
            </li>
        );
    }
};

Thumbnail.propTypes = {
    author: PropTypes.string,
    desc: PropTypes.string,
    href: PropTypes.string,
    src: PropTypes.string,
    title: PropTypes.string
}

export default Thumbnail;
