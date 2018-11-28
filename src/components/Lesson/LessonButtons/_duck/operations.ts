import { Dispatch } from 'redux';
import { AppRoutes } from '../../../../_common/';

const { lessons } = AppRoutes;

import { openDialog, closeDialog } from '../../../../app/Dialog/_duck/actions';
import { onReset } from '../../_duck/operations';

import history from '../../../../shared/history';
import { manageButtonFocus as buttonFocus } from '../../../../shared/button.focus';

const leave = (dispatch: Dispatch) => {
    dispatch(onReset());
    dispatch(closeDialog());
    history.push(lessons);
};

const cancelLeave = (dispatch: Dispatch) => dispatch(closeDialog());

const buttonsIds = [ 'dialogLeave', 'dialogCancel' ];
const manageButtonFocus = buttonFocus(buttonsIds, 1);

const onKeyDown = (e: KeyboardEvent): void => manageButtonFocus(e);

export const onStartLeaving = (): any => (dispatch: Dispatch) => {
    dispatch(
        openDialog({
            buttons: [
                [ 'leave', () => leave(dispatch), { id: buttonsIds[1] }],
                [ 'cancel', () => cancelLeave(dispatch), { id: buttonsIds[0], color: 'secondary', autoFocus: `{true}` } ]
            ],
            title: 'Do you want to leave lesson?',
            message: 'Are you sure?',
            onClose: () => cancelLeave(dispatch),
            onKeyDown: (e: KeyboardEvent) => onKeyDown(e)
        }
    ));
};

export default {
    onStartLeaving
};