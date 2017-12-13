import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunkMiddleware from 'redux-thunk';

import { reducer as galleryReducer } from './gallery/';
// import { reducer as filterReducer } from './filter/';

import Perf from 'react-addons-perf';

const win = window;
win.Perf = Perf;

const reducer = combineReducers({
    gallery: galleryReducer
    // inspiration: filterReducer
});

const middlewares = [ thunkMiddleware ];                    // 中间件

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default createStore( reducer, {}, storeEnhancers );
