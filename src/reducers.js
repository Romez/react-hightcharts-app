import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {HomeReducers} from './pages/home';

export default combineReducers({
    routing: routerReducer,
    ...HomeReducers
});
