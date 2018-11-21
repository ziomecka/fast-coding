import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as LocationChange } from './component';
import { ApplicationState } from '../../store';
import { AppState } from '../_reducers/';
import { ApplicationContainers, AppContainers } from '../../_common/';

const { app } = ApplicationContainers;

import { changeLocation } from './_duck/actions';

const mapStateToProps = (state: ApplicationState): AppState => ({
    ...state[app]
});

const mapDispatchToProps = (dispatch: Dispatch): LocationChangeDispatch => ({
    handleChangeLocation: (pathname, container) => dispatch(changeLocation(pathname, container)),
});

const LocationChangeContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LocationChange));

export default LocationChangeContainer;

export interface LocationChangeDispatch {
    handleChangeLocation: (pathname: string, container: AppContainers) => void;
};

export interface LocationChangeProps extends LocationChangeDispatch, AppState, RouteComponentProps<{}> {
    containers: AppContainers[];
};