import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as Password } from './component';
import { ApplicationState } from '@appStore';
import { AppState } from '@app/_reducers/';

import { setPassword, SetPasswordAction } from './_duck/actions';

import { ApplicationContainersEnum } from '@applicationTypes';
import { RulesErrorEnum } from '@sharedTypes';
import { AppContainersEnum, PasswordsEnum } from '@appTypes';

import { StandardTextFieldProps } from '@material-ui/core/TextField';

import { LocalizeState } from 'react-localize-redux';

import { onValidatePassword } from './_duck/operations';

const { app } = ApplicationContainersEnum;

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
        container: AppContainersEnum,
        event: React.ChangeEvent<HTMLInputElement>
    ) => SetPasswordAction;
    validatePassword: (password: string, passwordType: PasswordsEnum, container: AppContainersEnum, rules: RulesErrorEnum[], value2?: string) => Action
};

export interface PasswordProps extends PasswordDispatch, MapStateToPropsI, StandardTextFieldProps {
    container: AppContainersEnum;
    passwordType: PasswordsEnum;
    rules?: RulesErrorEnum[];
    value2?: string;
};