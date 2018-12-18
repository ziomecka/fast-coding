import * as React from 'react';

import { AuthRouteProps } from './container';

import { Route } from 'react-router-dom'

import history from '../../shared/history';
import { AppRoutesEnum } from '@appTypes';

const { home } = AppRoutesEnum;

const RouteAuthComponent: React.StatelessComponent<AuthRouteProps> = props => {
    const { condition, redirect, ...other } = props;

    /** If condition is not met - redirect to redirect or home */
    if ( !condition ) {
        history.push(redirect || home);
    }

    return <Route { ...other }/>;
};

export default RouteAuthComponent;
