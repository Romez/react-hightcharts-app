import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './home';

export default (
    <Route exact={true} path={HomePage.path} component={HomePage}/>
);
