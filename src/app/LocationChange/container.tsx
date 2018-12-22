import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as LocationChange } from './component';
import { ApplicationState } from '../../store';
import { AppState } from '../_reducers/';
import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';

const { app } = ApplicationContainersEnum;

import { changeLocation, ChangeLocationAction } from './_duck/actions';

const mapStateToProps = (state: ApplicationState): AppState => ({
    ...state[app]
});

const mapDispatchToProps = (dispatch: Dispatch): LocationChangeDispatch => ({
    handleChangeLocation: (pathname, container) => dispatch(changeLocation(pathname, container)),
});

// @ts-ignore
const LocationChangeContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LocationChange));

export default LocationChangeContainer;

export interface LocationChangeDispatch {
    handleChangeLocation: (pathname: string, container: AppContainersEnum) => ChangeLocationAction;
};

export interface LocationChangeProps extends LocationChangeDispatch, AppState, RouteComponentProps<{}> {
    containers: AppContainersEnum[];
};