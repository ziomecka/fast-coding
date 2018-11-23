import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as Dialog } from './component';
import { ApplicationState } from '../../store';

import { closeDialog, openDialog } from './_duck/actions';

import { DialogState } from './_duck/reducers';
import { default as operations } from './_duck/';


const { } = operations;

import { ApplicationContainers, AppContainers } from '../../_common/';

const { app } = ApplicationContainers;
const { dialog } = AppContainers;

const mapStateToProps = (state: ApplicationState): DialogState => ({
    ...state[app][dialog]
});

const mapDispatchToProps = (dispatch: Dispatch): DialogDispatch => ({
    dialogOpen: () => dispatch(openDialog()),
    dialogClose: () => dispatch(closeDialog())
});

const DialogContainer = connect(mapStateToProps, mapDispatchToProps)(Dialog);

export default DialogContainer;

export interface DialogDispatch {
    dialogOpen: () => void,
    dialogClose: () => void
};

export interface AppDialogProps extends DialogDispatch, DialogState {};