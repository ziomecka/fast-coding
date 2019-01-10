import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as LoginForm } from './component';
import { ApplicationState } from '@appStore';

import { LoginFormState } from './_duck/reducers';
import { onLog } from './_duck/operations';
import { onFormInvalid } from '@appForm/_duck/operations';

import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';
import { setLogin, SetLoginAction, reset } from './_duck/actions';
import { SendLoginFormI } from './_duck/types';

import { WithStyles } from '@material-ui/core/styles';

import { DialogDispatch, mapDispatchToProps as mapDialogDispatchToProps } from '@shared/dialog';

const { app } = ApplicationContainersEnum;
const { loginForm } = AppContainersEnum;

const mapStateToProps = ( state: ApplicationState ): LoginFormState => ( {
    ...state[app][loginForm]
} );

const mapDispatchToProps = ( dispatch: Dispatch ): LoginFormDispatch => ( {
    setLogin: ( login ) => dispatch( setLogin( login ) ),
    log: ( options ) => dispatch( onLog( options ) ),
    reset: () => dispatch( reset() ),
    formInvalid: () => dispatch( onFormInvalid() ),
    ...mapDialogDispatchToProps( dispatch )
} );

// @ts-ignore
const LabelContainer = withRouter( connect( mapStateToProps, mapDispatchToProps )( LoginForm ) );

export default LabelContainer;

export interface LoginFormDispatch extends DialogDispatch {
    setLogin: ( login: string ) => SetLoginAction;
    log: ( options: SendLoginFormI ) => Action;
    reset: () => Action;
    formInvalid: () => Action;
}

export interface LoginFormPropsI extends
    LoginFormDispatch,
    LoginFormState,
    WithStyles,
    RouteComponentProps<{}> {}
