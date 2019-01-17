import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as ChangePasswordForm } from './component';
import { ApplicationState } from '@appStore';

import { ChangePasswordFormState } from './_duck/reducers';

import { onSendForm } from './_duck/operations';
import { onFormInvalid } from '@appForm/_duck/operations';

import { setEmail, SetEmailAction, setLogin, SetLoginAction, reset } from './_duck/actions';

import { SendFormChangePasswordI } from './_duck/types';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { IWithMedia } from '@app/Media/';

const mapStateToProps = ( state: ApplicationState ): ChangePasswordFormState => ( {
    ...state.app.changePasswordForm
} );

const mapDispatchToProps = ( dispatch: Dispatch ): ChangePasswordFormDispatch => ( {
    sendForm: ( options ) => dispatch( onSendForm( options ) ),
    setEmail: ( email ) => dispatch( setEmail( email ) ),
    setLogin: ( login ) => dispatch( setLogin( login ) ),
    reset: () => dispatch( reset() ),
    formInvalid: () => dispatch( onFormInvalid() )
} );

const ChangePasswordFormContainer = connect( mapStateToProps, mapDispatchToProps )( ChangePasswordForm );

export default ChangePasswordFormContainer;

export interface ChangePasswordFormDispatch {
    sendForm: ( options: SendFormChangePasswordI ) => Action;
    setEmail: ( email: string ) => SetEmailAction;
    setLogin: ( login: string ) => SetLoginAction;
    reset: () => Action;
    formInvalid: () => Action;
}

export interface ChangePasswordFormProps extends
    ChangePasswordFormDispatch,
    ChangePasswordFormState,
    IWithMedia,
    WithStyles {}
