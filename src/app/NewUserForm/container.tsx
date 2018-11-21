import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as NewUserForm } from './component';
import { ApplicationState } from '../../store';

import { NewUserFormState } from './_duck/reducers';
import { NewUserFormOperations } from './_duck/';

import { ApplicationContainers, AppContainers } from '../../_common/';

const { app } = ApplicationContainers;
const { newUserForm } = AppContainers;

const mapStateToProps = (state: ApplicationState): NewUserFormState => ({
    ...state[app][newUserForm]
});

const mapDispatchToProps = (dispatch: Dispatch): NewUserFormDispatch => ({
    onSendNewUserForm: () => {}
});

const NewUserFormContainer = connect(mapStateToProps, mapDispatchToProps)(NewUserForm);

export default NewUserFormContainer;

export interface NewUserFormDispatch {
    onSendNewUserForm: () => void;
};

export interface NewUserFormProps extends NewUserFormDispatch, NewUserFormState {
};