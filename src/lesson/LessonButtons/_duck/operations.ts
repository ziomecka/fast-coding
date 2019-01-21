import { Action, Dispatch } from 'redux';
import { AppRoutesEnum } from '@appTypes';
import { ThunkGetStateType } from '@applicationTypes';

const { lessons } = AppRoutesEnum;

import { closeDialog, openDialog, DialogsEnum } from '@app/Dialog/';
const { yesCancel } = DialogsEnum;
import { onReset, onPauseLesson, onUnpauseLesson } from '@lesson/_operations/';

import history from '@shared/history';

import getTranslation from '@shared/get.translation';

import Message from '../message';

import { LEAVE_LESSON_BUTTON } from './constants';

export const onStartLeaving = (): any => async ( dispatch: Dispatch, getState: ThunkGetStateType ): Promise<Action> => {
    dispatch( onPauseLesson() );

    const press = getTranslation( getState().localize, 'buttonsPress' );

    return await dispatch( openDialog( {
        variant: yesCancel,
        Component: Message,
        buttons: {
            buttonYes: {
                buttonProps: {
                    onClick: async () => {
                        history.push( lessons );
                        return await dispatch( onReset() );
                    }
                },
                translationId: 'lessonDialogOKLeave',
                aftertext: `${ press } ${ LEAVE_LESSON_BUTTON }`
            },
            buttonCancel: {
                buttonProps: {
                    color: 'secondary',
                    autoFocus: true,
                    onClick: async () => await dispatch( onUnpauseLesson() )
                },
                translationId: 'lessonDialogCancelLeave',
                aftertext: `${ press } ESC`
            }
        },
        dialogProps: {
            onClose: () => dispatch( onUnpauseLesson() ),
            onEscapeKeyDown: () => dispatch( onUnpauseLesson() ),
            onKeyDown: ( e ) => {
                /** Leve lesson if y is pressed */
                if ( e.key === LEAVE_LESSON_BUTTON.toUpperCase() || e.key === LEAVE_LESSON_BUTTON.toLowerCase() ) {
                    history.push( lessons );
                    dispatch( closeDialog() );
                    dispatch( onReset() );
                }
            }
        },
        closeOnEscape: true
    } ) );
};

export default {
    onStartLeaving
};
