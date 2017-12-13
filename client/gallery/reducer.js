import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE } from './actionType.js';
import * as Status from './status.js';

export default (state={ status: Status.LOADING }, action) => {
    switch(action.type) {
        case FETCH_STARTED:
            return { ...state, id: action.id };
        case FETCH_SUCCESS:
            const { jsonData } = action;
            // console.log(jsonData)
            return { ...state, inspirations: jsonData["data"], status: Status.SUCCESS };
        case FETCH_FAILURE:
            return { ...state, status: Status.FAILURE };
        default:
            return state;
    }
}
