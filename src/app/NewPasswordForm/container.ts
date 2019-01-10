import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as NewPasswordForm } from './component';
import { ApplicationState } from '@appStore';

import { NewPasswordFormState } from './_duck/reducers';

import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';
import { reset } from './_duck/actions';
import { SendFormNewPasswordFormI } from './_duck/types';

import { onSendForm } from './_duck/operations';
import { onFormInvalid } from '@appForm/_duck/operations';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { WithStyles } from '@material-ui/core/styles/withStyles';

import { onAppError } from '@app/AppError/_duck/operations';
import { AppErrorI } from '@app/AppError/_duck/types';

const { app } = ApplicationContainersEnum;
const { newPasswordForm } = AppContainersEnum;

const mapStateToProps = ( state: ApplicationState ): NewPasswordFormState => ( {
    ...state[app][newPasswordForm]
} );

const mapDispatchToProps = ( dispatch: Dispatch ): NewPasswordFormDispatch => ( {
    sendForm: ( options ) => dispatch( onSendForm( options ) ),
    reset: () => dispatch( reset() ),
    formInvalid: () => dispatch( onFormInvalid() ),
    displayAppError: ( options ) => dispatch( onAppError( options ) )
} );

// @ts-ignore
const NewPasswordFormContainer = withRouter( connect( mapStateToProps, mapDispatchToProps )( NewPasswordForm ) );

export default NewPasswordFormContainer;

export interface NewPasswordFormDispatch {
    sendForm: ( options: SendFormNewPasswordFormI ) => Action;
    reset: () => Action;
    formInvalid: () => Action;
    displayAppError: ( options?: AppErrorI ) => Action;
}

export interface NewPasswordFormPropsI extends
    NewPasswordFormDispatch,
    NewPasswordFormState,
    RouteComponentProps<{}>,
    WithStyles {}