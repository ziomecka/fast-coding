import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as Login } from './component';
import { ApplicationState } from '../../store';
import { AppState } from '../_reducers/';

import { setLogin } from './_duck/actions';
import { AppContainers } from '../_common';
import { ApplicationContainers } from '../../_common';

const { app } = ApplicationContainers;

const mapStateToProps = (state: ApplicationState): AppState => ({
    ...state[app]
});

const mapDispatchToProps = (dispatch: Dispatch): LoginDispatch => ({
    setLogin: (container, event) => dispatch(setLogin(event.target.value, container))
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;

export interface LoginDispatch {
    setLogin: (
        container: AppContainers,
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
};

export interface LoginProps extends LoginDispatch, AppState {
    container: AppContainers;
};