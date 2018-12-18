import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as ChangePasswordForm } from './component';
import { ApplicationState } from '../../store';

import { ChangePasswordFormState } from './_duck/reducers';

import { ApplicationContainers, AppContainers } from '@appTypes';
import { onSendForm } from './_duck/operations';
import { onFormInvalid } from '../Form/_duck/operations';

import { setEmail, SetEmailAction, setLogin, SetLoginAction, reset } from './_duck/actions';

import { SendFormChangePasswordI } from './_duck/types';

const { app } = ApplicationContainers;
const { changePasswordForm } = AppContainers;

const mapStateToProps = (state: ApplicationState): ChangePasswordFormState => ({
    ...state[app][changePasswordForm]
});

const mapDispatchToProps = (dispatch: Dispatch): ChangePasswordFormDispatch => ({
    sendForm: (options) => dispatch(onSendForm(options)),
    setEmail: (email) => dispatch(setEmail(email)),
    setLogin: (login) => dispatch(setLogin(login)),
    reset: () => dispatch(reset()),
    formInvalid: () => dispatch(onFormInvalid())
});

const ChangePasswordFormContainer = connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);

export default ChangePasswordFormContainer;

export interface ChangePasswordFormDispatch {
    sendForm: (options: SendFormChangePasswordI) => Action;
    setEmail: (email: string) => SetEmailAction;
    setLogin: (login: string) => SetLoginAction;
    reset: () => Action;
    formInvalid: () => Action;
};

export interface ChangePasswordFormProps extends ChangePasswordFormDispatch, ChangePasswordFormState {};