import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';

export default (
    <Route exact={true} path={HomePage.path} component={HomePage}/>
);
