import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as LoginForm } from './component';
import { ApplicationState } from '../../store';

import { LoginFormState } from './_duck/reducers';
import { onLog } from './_duck/operations';
import { onFormInvalid } from '../Form/_duck/operations';

import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';
import { setLogin, SetLoginAction, reset } from './_duck/actions';

import { WithStyles } from '@material-ui/core/styles';

const { app } = ApplicationContainersEnum;
const { loginForm } = AppContainersEnum;

const mapStateToProps = (state: ApplicationState): LoginFormState => ({
    ...state[app][loginForm]
});

const mapDispatchToProps = (dispatch: Dispatch): LoginFormDispatch => ({
    setLogin: (login) => dispatch(setLogin(login)),
    log: (login, password) => dispatch(onLog(login, password)),
    reset: () => dispatch(reset()),
    formInvalid: () => dispatch(onFormInvalid())
});

const LabelContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default LabelContainer;

export interface LoginFormDispatch {
    setLogin: (login: string) => SetLoginAction;
    log: (login: string, password: string) => Action;
    reset: () => Action;
    formInvalid: () => Action;
};

export interface LoginFormPropsI extends
    LoginFormDispatch,
    LoginFormState,
    WithStyles {};