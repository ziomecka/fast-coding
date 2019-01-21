import { Action, Dispatch } from 'redux';
import { AppRoutesEnum } from '@appTypes';
import { ThunkGetStateType } from '@applicationTypes';

const { lessons } = AppRoutesEnum;

import { openDialog, DialogsEnum } from '@app/Dialog/';
const { yesCancel } = DialogsEnum;
import { onReset, onPauseLesson, onUnpauseLesson } from '@lesson/_operations/';

import history from '@shared/history';

import getTranslation from '@shared/get.translation';

import Message from '../message';

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
                aftertext: `${ press } Enter`
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
            onClose: () => dispatch( onUnpauseLesson() )
        }
    } ) );
};

export default {
    onStartLeaving
};
