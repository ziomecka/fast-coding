import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as LoginForm } from './component';
import { ApplicationState } from '../../store';

import { LoginFormState } from './_duck/reducers';
import { LoginFormOperations } from './_duck/';
const { onLoginForm } = LoginFormOperations;

import { ApplicationContainers, AppContainers } from '../../_common/';

const { app } = ApplicationContainers;
const { loginForm } = AppContainers;

const mapStateToProps = (state: ApplicationState): LoginFormState => ({
    ...state[app][loginForm]
});

const mapDispatchToProps = (dispatch: Dispatch): LoginFormDispatch => ({
    onLoginForm: () => dispatch(onLoginForm()),
});

const LabelContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default LabelContainer;

export interface LoginFormDispatch {
    onLoginForm: () => void;
};

export interface LoginFormProps extends LoginFormDispatch, LoginFormState {
};