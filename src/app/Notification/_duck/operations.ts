import { Dispatch } from 'redux';

import { openNotification, closeNotification, OpenNotificationAction } from './actions';
import { NOTIFICATION_DURATION } from '../../../constants';
import getTranslation from '../../../shared/get.translation';
import { ThunkGetStateType } from '../../../_common';

let _timeout;

export const onOpenNotification = (options: OpenNotificationAction): any => (
    async (dispatch: Dispatch, getState: ThunkGetStateType ): Promise<any> => {
        const { text, timeout = NOTIFICATION_DURATION } = options;

            dispatch(openNotification({
                text: getTranslation(getState().localize, text),
                timeout
            }));

            _timeout = setTimeout(() => {
                dispatch(closeNotification());
                clearTimeout(_timeout);
            }, timeout)
    }
);

export default {
    onOpenNotification
};