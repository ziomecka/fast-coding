import { Dispatch, Action } from 'redux';
import { closeDialog, openDialog } from './actions';
import {
    SimpleDialogOptions,
    YesDialogOptions,
    YesCancelDialogOptions,
    DialogsEnum,
    OpenDialogOptions
} from './types';

const { simple, yes, yesCancel } = DialogsEnum;

const onOpenSimpleDialog = ( options: SimpleDialogOptions ): any => (
    ( dispatch: Dispatch ) => {
        dispatch( openDialog( Object.assign( options, {
            dialogProps: {
                ...options.dialogProps,
                onBackdropClick: () => dispatch( closeDialog() )
            },
            closeButton: true
        } ) ) );
    }
);

const onOpenYesDialog = ( options: YesDialogOptions ): any => (
    ( dispatch: Dispatch ) => {
        let {
            buttons: {
                buttonYes: { buttonProps: { onClick: onClickYes } },
            } = { buttonYes: { buttonProps: { onClick: null } } }
        } = options;

        dispatch( openDialog( Object.assign(
            options, { buttons: {
                buttonYes: {
                    translationId: 'buttonYes',
                    ...Object( options.buttons ).buttonYes,
                    buttonProps: {
                        ...Object( Object( options.buttons ).buttonYes ).buttonProps,
                        onClick: async ( e ) => {
                            if ( typeof onClickYes === 'function' ) {
                                onClickYes( e );
                                onClickYes = null; // GC
                            }
                            dispatch( closeDialog() );
                        }
                    }
                }
            } }
        ) ) );
    }
);

const onOpenYesCancelDialog = ( options: YesCancelDialogOptions ): any => (
    ( dispatch: Dispatch ) => {
        let {
            buttons: {
                buttonYes: { buttonProps: { onClick: onClickYes } },
                buttonCancel: { buttonProps: { onClick: onClickCancel } }
            } = {
                buttonYes: { buttonProps: { onClick: null } },
                buttonCancel: { buttonProps: { onClick: null } }
            }
        } = options;

        dispatch( openDialog( Object.assign(
            options, { buttons: {
                buttonYes: {
                    translationId: 'buttonYes',
                    ...Object( options.buttons ).buttonYes,
                    buttonProps: {
                        ...Object( Object( options.buttons ).buttonYes ).buttonProps,
                        onClick: async ( e ) => {
                            if ( typeof onClickYes === 'function' ) {
                                onClickYes( e );
                                onClickYes = null; // GC
                            }
                            onClickCancel = null; // GC
                            dispatch( closeDialog() );
                        }
                    }
                },
                buttonCancel: {
                    translationId: 'buttonCancel',
                    ...Object( options.buttons ).buttonCancel,
                    buttonProps: {
                        ...Object( Object( options.buttons ).buttonCancel ).buttonProps,
                        onClick: async ( e ) => {
                            if ( typeof onClickCancel === 'function' ) {
                                onClickCancel( e );
                                onClickCancel = null; // GC
                            }
                            onClickYes = null; // GC
                            dispatch( closeDialog() );
                        }
                    },
                }
            } }
        ) ) );
    }
);

const map = new Map( [
    [ simple, onOpenSimpleDialog ],
    [ yes, onOpenYesDialog ],
    [ yesCancel, onOpenYesCancelDialog ]
] );

export const onOpenDialog = ( options: OpenDialogOptions ): any => (
    ( dispatch: Dispatch ) => {
        const { variant, ...other } = options;
        dispatch( map.get( variant )( other ) );
    }
);

export const onCloseDialog = (): any => ( dispatch: Dispatch ): Action => dispatch( closeDialog() );

export default {
    onCloseDialog,
    onOpenDialog
};
