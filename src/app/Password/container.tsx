import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as Password } from './component';
import { ApplicationState } from '../../store';
import { AppState } from '../_reducers/';

import { setPassword } from './_duck/actions';
import { AppContainers, ApplicationContainers, PasswordTypes } from '../../_common';

import { StandardTextFieldProps } from '@material-ui/core/TextField';

import { LocalizeState } from 'react-localize-redux';

const { app } = ApplicationContainers;

const mapStateToProps = (state: ApplicationState): MapStateToPropsI => ({
    ...state[app],
    localize: state.localize
});

const mapDispatchToProps = (dispatch: Dispatch): PasswordDispatch => ({
    setPassword: (passwordType, container, event) => dispatch(setPassword(event.target.value, passwordType, container))
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
    ) => void;
};

export interface PasswordProps extends PasswordDispatch, MapStateToPropsI, StandardTextFieldProps {
    container: AppContainers;
    passwordType: PasswordTypes;
};