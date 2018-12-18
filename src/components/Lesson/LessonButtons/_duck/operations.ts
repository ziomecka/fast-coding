import { Dispatch } from 'redux';
import { AppRoutes } from '@applicationTypes';
import { ApplicationState } from '../../../../_reducers';

const { lessons } = AppRoutes;

import { openDialog, closeDialog } from '../../../../app/Dialog/_duck/actions';
import { onReset, onPauseLesson, onUnpauseLesson, } from '../../_duck/operations/life';

import history from '../../../../shared/history';
import { manageButtonFocus as buttonFocus } from '../../../../shared/button.focus';

import getTranslation from '../../../../shared/get.translation';

const leave = (dispatch: Dispatch) => {
    dispatch(onReset());
    dispatch(closeDialog());
    history.push(lessons);
};

const cancelLeave = (dispatch: Dispatch) => {
    let answer = dispatch(closeDialog());
    if (answer) {
        dispatch(onUnpauseLesson());
        answer = null; // GC
    }
}

const buttonsIds = [ 'dialogLeave', 'dialogCancel' ];
const manageButtonFocus = buttonFocus(buttonsIds, 1);

const onKeyDown = (e: KeyboardEvent): void => manageButtonFocus(e);

export const onStartLeaving = (): any => (dispatch: Dispatch, getState: ()=> ApplicationState) => {
    dispatch(onPauseLesson());

    const press = getTranslation(getState().localize, 'buttonsPress');

    dispatch(
        openDialog({
            buttons: [
                {
                    title: 'leave',
                    buttonProps: {
                        id: buttonsIds[0],
                        onClick: () => leave(dispatch),
                    },
                    translationId: 'lessonDialogOKLeave',
                    // afterText: `${press} Enter`
                },
                {
                    title: 'cancel',
                    buttonProps: {
                        id: buttonsIds[1],
                        color: 'secondary',
                        autoFocus: `{true}`,
                        onClick: () => cancelLeave(dispatch),
                    },
                    translationId: 'lessonDialogCancelLeave',
                    aftertext: `${press} ESC`
                }
            ],
            titleId: 'lessonDialogLeaveQuestion',
            messageId: 'lessonDialogLeaveExplanation',
            dialogProps: {
                onClose: () => cancelLeave(dispatch),
                onKeyDown: (e: KeyboardEvent) => onKeyDown(e)
            }
        }
    ));
};

export default {
    onStartLeaving
};