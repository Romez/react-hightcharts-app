import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {HomeRoute} from './pages/home';
import {TableRouter} from './pages/table';
import ErrorPage from './pages/error';
import App from './app';

export default (
    <App>
        <Switch>
            {HomeRoute}
            {TableRouter}
            <Route component={ErrorPage}/>
        </Switch>
    </App>
);
