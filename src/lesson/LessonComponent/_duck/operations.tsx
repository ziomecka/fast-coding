import { openDialog, DialogsEnum } from '@app/Dialog/';

import { Action, Dispatch } from 'redux';

import { AppRoutesEnum } from '@appTypes';
import Message from '../message';
import { ThunkGetStateType } from '@applicationTypes';

import history from '@shared/history';
import {
    onPauseLesson,
    onReset
} from '@lesson/_operations/';

const { yesCancel } = DialogsEnum;
const { lessons } = AppRoutesEnum;

const informXs = (): any => async ( dispatch: Dispatch, getState: ThunkGetStateType ): Promise<Action> => {
    const { started, paused } = getState().lesson;

    if ( started && ! paused ) {
        dispatch( onPauseLesson() );
    }

    return await dispatch( openDialog( {
        variant: yesCancel,
        Component: Message,
        buttons: {
            buttonYes: {
                buttonProps: {
                    onClick: async () => {
                        history.push( lessons );
                        return await dispatch( onReset() );
                    },
                    color: 'secondary'
                },
                translationId: 'lessonDialogOKLeave',
            },
        }
    } ) );
};

export default { informXs };
