import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as RemindPassword } from './component';
import { ApplicationState } from '../../store';

import { RemindPasswordState } from './_duck/reducers';

import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';
import { reset, setEmail, SetEmailAction, SetEmail } from './_duck/actions';
import { SendFormRemindPasswordI } from './_duck/types';

import { onSendForm } from './_duck/operations';
import { onFormInvalid } from '../Form/_duck/operations';

const { app } = ApplicationContainersEnum;
const { remindPasswordForm } = AppContainersEnum;

const mapStateToProps = (state: ApplicationState): RemindPasswordState => ({
    ...state[app][remindPasswordForm]
});

const mapDispatchToProps = (dispatch: Dispatch): RemindPasswordDispatch => ({
    sendForm: (options) => dispatch(onSendForm(options)),
    setEmail: (options) => dispatch(setEmail(options)),
    reset: () => dispatch(reset()),
    formInvalid: () => dispatch(onFormInvalid())
});

const LabelContainer = connect(mapStateToProps, mapDispatchToProps)(RemindPassword);

export default LabelContainer;

export interface RemindPasswordDispatch {
    sendForm: (options: SendFormRemindPasswordI) => Action;
    setEmail: (options: SetEmail) => SetEmailAction;
    reset: () => Action;
    formInvalid: () => Action;
};

export interface RemindPasswordPropsI extends RemindPasswordDispatch, RemindPasswordState {};