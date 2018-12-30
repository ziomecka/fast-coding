import { connect } from 'react-redux';

import { default as Dialog } from './component';
import { ApplicationState } from '@appStore';

import { DialogState } from './_duck/reducers';

import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';

const { app } = ApplicationContainersEnum;
const { dialog } = AppContainersEnum;

const mapStateToProps = (state: ApplicationState): DialogState => ({
    ...state[app][dialog]
});

const DialogContainer = connect(mapStateToProps)(Dialog);

export default DialogContainer;

export interface AppDialogProps extends DialogState {};