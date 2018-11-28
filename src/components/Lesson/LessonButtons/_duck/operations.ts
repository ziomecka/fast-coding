import { Dispatch } from 'redux';
import { AppRoutes } from '../../../../_common/';

const { lessons } = AppRoutes;

import { openDialog, closeDialog } from '../../../../app/Dialog/_duck/actions';
import { onReset } from '../../_duck/operations';

import history from '../../../../shared/history';

const leave = (dispatch: Dispatch) => {
    dispatch(onReset());
    dispatch(closeDialog());
    history.push(lessons);
};

const cancelLeave = (dispatch: Dispatch) => dispatch(closeDialog());

export const onStartLeaving = (): any => (dispatch: Dispatch) => {
    dispatch(
        openDialog({
            buttons: [
                [ 'leave', () => leave(dispatch) ],
                [ 'cancel', () => cancelLeave(dispatch), {color: "secondary"} ]
            ],
            title: "Do you want to leave lesson?",
            message: "Are you sure?",
            onClose: () => cancelLeave(dispatch)
        }
    ));
};

export default {
    onStartLeaving
};