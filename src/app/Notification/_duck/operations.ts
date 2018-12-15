import { Dispatch } from 'redux';

import { openNotification, closeNotification, OpenNotificationAction } from './actions';
import { NOTIFICATION_DURATION } from '../../../constants';
import getTranslation from '../../../shared/get.translation';
import { ThunkGetStateType } from '../../../_common';

let timeout;

export const onOpenNotification = (text: string, time: number = NOTIFICATION_DURATION): any => (
    async (dispatch: Dispatch, getState: ThunkGetStateType ): Promise<any> => {

            dispatch(openNotification(getTranslation(getState().localize, text)));

            timeout = setTimeout(() => {
                dispatch(closeNotification());
                clearTimeout(timeout);
                answer = null; // GC?
            }, time)
    }
);

export default {
    onOpenNotification
};