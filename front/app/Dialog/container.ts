import { connect } from 'react-redux';

import { default as Dialog } from './component';
import { ApplicationState } from '@appStore';

import { DialogState } from './_duck/reducers';

import { WithStyles } from '@material-ui/core/styles';

import { DialogDispatch, mapDispatchToProps } from '@shared/dialog';

const mapStateToProps = ( state: ApplicationState ): DialogState => ( {
    ...state.app.dialog
} );

const DialogContainer = connect( mapStateToProps, mapDispatchToProps )( Dialog );

export default DialogContainer;

export interface AppDialogProps extends
DialogDispatch,
DialogState,
WithStyles {}
