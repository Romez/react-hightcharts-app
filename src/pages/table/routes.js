import React from 'react';
import { Route } from 'react-router-dom';
import TablePage from './TablePage';

export default (
    <Route exact={true} path={TablePage.path} component={TablePage}/>
);
