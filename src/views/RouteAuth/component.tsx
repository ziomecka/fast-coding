import * as React from 'react';

import { AuthRouteProps } from './container';

import { Route } from 'react-router-dom'

import history from '../../shared/history';
import { AppRoutes } from '../../_common/';
const { home } = AppRoutes;

const RouteAuthComponent: React.StatelessComponent<AuthRouteProps> = props => {
    const { authorized, ...other } = props;

    /** If user is unauthorized - redirect them to home */
    if ( !authorized ) {
        history.push(home);
    }

    return <Route { ...other }/>;
};

export default RouteAuthComponent;
