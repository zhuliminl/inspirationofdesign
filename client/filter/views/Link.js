import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as galleryActions } from '../../gallery/';

const { fetchInspiration } = galleryActions;

class Link extends Component {

    handleOnClick(id, active, event) {
        const siteName = event.target.innerText;
        const link = event.target;
        this.slideDiv(link, id);                                // 链接的 hover 效果

        this.props.onClick(siteName, id);

        // 转场动画
        const gallery = document.getElementsByClassName('gallery')[0];
        if(!active) {
            console.log('页面正准备离去')
            gallery ? gallery.style.marginTop = '3000px' : null;
            const loading = document.getElementsByClassName('loading')[0];
            loading.style.display = 'block';
        }
    }

    // 配合 CSS3  的动画,让下划线随着点击改变位置
    slideDiv(eventTarget, id) {
        const list = eventTarget.parentElement.parentElement;    // 向上取到 ul 这个父元素
        const div = list.getElementsByTagName('div')[0];
        const percent = id/4*100;                                // 计算偏移的百分比
        div.style.marginLeft = `${percent}%`;
    }

    componentWillMount() {
        console.log('页面即将加载')                              // 整个交互中只执行了一个四次
    }

    // 默认的加载网站
    componentDidMount() {
        this.props.onClick('dribbble', 1, true);
    }

    render() {
        const { siteName, id, active } = this.props;
        const style = active ? { color: 'red' } : { color: 'black' };       // 点击后改变链接颜色
        return(
            <li className="filter__item">
                <a href="#" onClick={ this.handleOnClick.bind(this, id, active) } style={ style } >{ siteName }</a>
            </li>
        );
    }
};

Link.propTypes = {
    onClick: PropTypes.func,
    id: PropTypes.number,
    active: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
    return {
        active: state.gallery.id === ownProps.id            // 对比前后请求的ID
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: (siteName, id) => {
            dispatch(fetchInspiration(siteName, id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Link);
