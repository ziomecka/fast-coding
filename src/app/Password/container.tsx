import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as Password } from './component';
import { ApplicationState } from '../../store';
import { AppState } from '../_reducers/';

import { setPassword, SetPasswordAction } from './_duck/actions';
import { AppContainers, ApplicationContainers, PasswordTypes, invalidError } from '../../_common';

import { StandardTextFieldProps } from '@material-ui/core/TextField';

import { LocalizeState } from 'react-localize-redux';

import { onValidatePassword } from './_duck/operations';

const { app } = ApplicationContainers;

const mapStateToProps = (state: ApplicationState): MapStateToPropsI => ({
    ...state[app],
    localize: state.localize
});

const mapDispatchToProps = (dispatch: Dispatch): PasswordDispatch => ({
    setPassword: (passwordType, container, event) => dispatch(setPassword(event.target.value, passwordType, container)),
    validatePassword: (password, passwordType, container, rules, value2) => dispatch(onValidatePassword(password, passwordType, container, rules, value2))
});

const PasswordContainer = connect(mapStateToProps, mapDispatchToProps)(Password);

export default PasswordContainer;

interface MapStateToPropsI extends AppState {
    localize: LocalizeState
};

export interface PasswordDispatch {
    setPassword: (
        password: string,
        container: AppContainers,
        event: React.ChangeEvent<HTMLInputElement>
    ) => SetPasswordAction;
    validatePassword: (password: string, passwordType: PasswordTypes, container: AppContainers, rules: invalidError[], value2?: string) => Action
};

export interface PasswordProps extends PasswordDispatch, MapStateToPropsI, StandardTextFieldProps {
    container: AppContainers;
    passwordType: PasswordTypes;
    rules?: invalidError[];
    value2?: string;
};