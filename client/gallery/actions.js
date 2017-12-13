import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE } from './actionType.js';

export const fetchInspirationStarted = (id) => ({
    type: FETCH_STARTED,
    id
});

export const fetchInspirationSuccess = (jsonData) => ({
    type: FETCH_SUCCESS,
    jsonData
});

export const fetchInspirationFailure = (error) => ({
    type: FETCH_FAILURE,
    error
});
// 以上三个属于普通构造函数，用来驱动状态的改变


// 异步 action 函数
// fetchInspiration 并不会写到 reducer 里面去，它属于异步 action 构造函数，内部派发普通的 action 构造函数
export const fetchInspiration = (siteName, id) => {
    return (dispatch) => {
        const API = `http://127.0.0.1:5000/api/${siteName.toLowerCase()}`;
        dispatch(fetchInspirationStarted(id));
        // console.log(API)

        // 异步请求
        return fetch(API).then((response) => {
            if(response.status != 200) {
                throw new Error('Fail to get response with status' + response.status);
            }
            response.json().then((responseJSON) => {
                dispatch(fetchInspirationSuccess(responseJSON));
            }).catch((error) => {
                console.log(error)
                dispatch(fetchInspirationFailure(error));
            })
        }).catch((error) => {
            console.log(error)
            dispatch(fetchInspirationFailure(error));
        })

    }
};
