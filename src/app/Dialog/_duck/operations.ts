import { Dispatch, Action } from 'redux';
import { closeDialog, openDialog } from './actions';
import {
    SimpleDialogOptions,
    YesDialogOptions,
    YesCancelDialogOptions,
    DialogsEnum,
    OpenDialogOptions
} from './types';

import { manageButtonFocus as buttonFocus } from '@shared/button.focus';

const { simple, yes, yesCancel } = DialogsEnum;

const onBackdropEscapeClick = ( dispatch: Dispatch, options: SimpleDialogOptions | YesDialogOptions, callback?: () => any ) => {
    let {
        closeOnBackdrop = true,
        closeOnEscape = true,
        dialogProps,
    } = options;

    return {
        onBackdropClick: ( e ) => {
            if ( dialogProps.onBackdropClick ) dialogProps.onBackdropClick( e );

            if ( closeOnBackdrop ) {
                dispatch( closeDialog() );
            }

            if ( callback ) callback();
        },
        onEscapeKeyDown: ( e ) => {
            if ( dialogProps.onEscapeKeyDown ) dialogProps.onEscapeKeyDown( e );

            if ( closeOnEscape ) {
                dispatch( closeDialog() );
            }

            if ( callback ) callback();
        },
    };
};


const onOpenSimpleDialog = ( options: SimpleDialogOptions ): any => (
    ( dispatch: Dispatch ) => {
        let {
            closeOnBackdrop = true,
            closeOnEscape = true,
            dialogProps,
            ...other
        } = options;

        dispatch( openDialog( Object.assign( other, {
            dialogProps: {
                ...dialogProps,
                ...onBackdropEscapeClick( dispatch, options )
            },
            closeButton: true
        } ) ) );

        dialogProps = null;
        other = null; // GC
    }
);

const onOpenYesDialog = ( options: YesDialogOptions ): any => (
    ( dispatch: Dispatch ) => {
        let {
            buttons: {
                buttonYes: { buttonProps: { onClick: onClickYes } },
            } = { buttonYes: { buttonProps: { onClick: null } } },
            closeOnBackdrop,
            closeOnEscape,
            dialogProps,
            ...other
        } = options;

        dispatch( openDialog( Object.assign( other,
            { buttons: {
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
            } },
            {
                dialogProps: {
                    ...dialogProps,
                    ...onBackdropEscapeClick( dispatch, options )
                }
            }
        ) ) );

        dialogProps = null;
        other = null; // GC
    }
);

const onOpenYesCancelDialog = ( options: YesCancelDialogOptions ): any => (
    ( dispatch: Dispatch ) => {
        let {
            buttons: {
                buttonYes: {
                    buttonProps: {
                        id: buttonYesId = 'dialogYesId',
                        onClick: onClickYes,
                        tabIndex: tabIndexYes = 0
                    }
                },
                buttonCancel: {
                    buttonProps: {
                        id: buttonCancelId = 'dialogCancelId',
                        onClick: onClickCancel,
                        tabIndex: tabIndexCancel = 1
                    }
                } = {
                    buttonProps: {
                        onClick: null,
                        id: buttonCancelId = 'dialogCancelId'
                    }
                }
            } = {
                buttonYes: {
                    buttonProps: {
                        onClick: null,
                        id: 'dialogYesId'
                    },
                },
                buttonCancel: {
                    translationId: 'buttonCancel',
                    buttonProps: {
                        onClick: null,
                        id: 'dialogCancelId'
                    }
                }
            },
            closeOnBackdrop,
            closeOnEscape,
            dialogProps,
            ...other
        } = options;

        let manageButtonFocus = buttonFocus( [ buttonYesId, buttonCancelId ], 1 );

        dispatch( openDialog( Object.assign( other,
            { buttons: {
                buttonYes: {
                    ...Object( options.buttons ).buttonYes,
                    // TODO change the way the default value is received - can be done in destructuring
                    translationId: Object( options.buttons ).buttonYes.translationId || 'buttonYes',
                    buttonProps: {
                        ...Object( Object( options.buttons ).buttonYes ).buttonProps,
                        id: buttonYesId,
                        tabIndex: tabIndexYes,
                        onClick: async ( e ) => {
                            if ( typeof onClickYes === 'function' ) {
                                onClickYes( e );
                                onClickYes = null; // GC
                            }
                            onClickCancel = null; // GC
                            manageButtonFocus = null; // GC
                            dispatch( closeDialog() );
                        }
                    }
                },
                buttonCancel: {
                    ...Object( options.buttons ).buttonCancel,
                    // TODO change the way the default value is received - can be done in destructuring
                    translationId: Object( options.buttons ).buttonCancel.translationId || 'buttonCancel',
                    buttonProps: {
                        ...Object( Object( options.buttons ).buttonCancel ).buttonProps,
                        id: buttonCancelId,
                        tabIndex: tabIndexCancel,
                        onClick: async ( e ) => {
                            if ( typeof onClickCancel === 'function' ) {
                                onClickCancel( e );
                                onClickCancel = null; // GC
                            }
                            onClickYes = null; // GC
                            manageButtonFocus = null; // GC
                            dispatch( closeDialog() );
                        }
                    },
                }
            } },
            {
                dialogProps: {
                    ...onBackdropEscapeClick( dispatch, options, () => manageButtonFocus = null ),
                    onKeyDown: ( e ) => manageButtonFocus( e ),
                    ...dialogProps
                }
            }
        ) ) );

        dialogProps = null;
        other = null; // GC
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
