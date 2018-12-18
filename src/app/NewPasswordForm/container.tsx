import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as NewPasswordForm } from './component';
import { ApplicationState } from '../../store';

import { NewPasswordFormState } from './_duck/reducers';

import { ApplicationContainersEnum, AppContainersEnum } from '@appTypes';
import { reset  } from './_duck/actions';
import { SendFormNewPasswordFormI } from './_duck/types';

import { onSendForm } from './_duck/operations';
import { onFormInvalid } from '../Form/_duck/operations';

import { withRouter, RouteComponentProps } from 'react-router-dom';

const { app } = ApplicationContainersEnum;
const { newPasswordForm } = AppContainersEnum;

const mapStateToProps = (state: ApplicationState): NewPasswordFormState => ({
    ...state[app][newPasswordForm]
});

const mapDispatchToProps = (dispatch: Dispatch): NewPasswordFormDispatch => ({
    sendForm: (options) => dispatch(onSendForm(options)),
    reset: () => dispatch(reset()),
    formInvalid: () => dispatch(onFormInvalid())
});

const LabelContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPasswordForm));

export default LabelContainer;

export interface NewPasswordFormDispatch {
    sendForm: (options: SendFormNewPasswordFormI) => Action;
    reset: () => Action;
    formInvalid: () => Action;
};

export interface NewPasswordFormPropsI extends NewPasswordFormDispatch, NewPasswordFormState, RouteComponentProps<{}> {};