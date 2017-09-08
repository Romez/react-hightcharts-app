import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {DevTools} from './utils';

function getMiddleware() {
    const middleware = [thunk];
    return applyMiddleware(...middleware);
}

export default function configureStore(intialState) {
    return compose(
        getMiddleware(),
        DevTools.instrument()
    )(createStore)(rootReducer, intialState);
}
