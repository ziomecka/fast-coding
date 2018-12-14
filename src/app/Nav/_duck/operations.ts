import { Dispatch, Action } from 'redux';

import { unauthorizeUser } from '../../User/_duck/actions';
import { onOpenNotification } from '../../Notification/_duck/operations';

import getTranslation from '../../../shared/get.translation';
import { ThunkGetStateType, AppRoutes } from '../../../_common/';
import history from '../../../shared/history';

const { lessons } = AppRoutes;

export const onLogOut = (): any => (
    async (dispatch: Dispatch, getState: ThunkGetStateType): Promise<Action> => {
        let response = await dispatch(unauthorizeUser());

        // TODO if not try catch?
        /** redirect to lessons and notify about success */
        if (response) {
            response = null;
            history.push(lessons);
            return dispatch(onOpenNotification(getTranslation(getState().localize, 'notificationSignOutSuccess')));
        }
});

export default {
    onLogOut
};