

import * as React from 'react';

import { AuthRouteProps } from './container';

import { Route } from 'react-router-dom'

import { AppRoutesEnum } from '@appTypes';

import history from '@shared/history';

const { home } = AppRoutesEnum;

const RouteAuthComponent: React.StatelessComponent<AuthRouteProps> = props => {
    const { condition, redirect, location, history, ...other } = props;

    /** If condition is not met - redirect to redirect or home */
    if ( !condition ) {
        history.push(redirect || home);
    }

    return <Route { ...other } />;
};

export default RouteAuthComponent;
