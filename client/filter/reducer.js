import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE, TOGGLE_SITE } from './actionType.js';
import * as Status from './status.js';          // 引入加载阶段的状态字段
import { siteList } from './constants.js';      // 引入可选爬虫的配置文件

// 初始化 filter 的状态
const filterInit = siteList.map((item) => ({
    name: item,
    active: true,
    contents: []
}));

// 初始化状态
const stateInit = {
    status: Status.LOADING,
    siteList: filterInit
};

export default (state= stateInit, action) => {
    switch(action.type) {
        case FETCH_STARTED:
            return state;

        case FETCH_SUCCESS:
            const { siteList } = state;
            const { jsonData, siteName } = action;

            for (const siteItem of siteList) {
                if(siteItem["name"] === siteName) {
                    siteItem["contents"] = jsonData["data"]
                }
            }
            return { ...state, status: Status.SUCCESS };

        case FETCH_FAILURE:
            return state;

        case TOGGLE_SITE:
            return;

        default:
            return state;
    }
};
