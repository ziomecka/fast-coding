import { Dispatch } from 'redux';

import { setNotification, openNotification, closeNotification, SetNotificationAction } from './actions';
import getTranslation from '@shared/get.translation';
import { ThunkGetStateType } from '@applicationTypes';

import { NotificationDurationEnum } from './types';

let _timeout;

const { standard } = NotificationDurationEnum;

export const onOpenNotification = (options: SetNotificationAction, autoHideduration: NotificationDurationEnum = standard): any => (
    async (dispatch: Dispatch, getState: ThunkGetStateType ): Promise<any> => {
        const { text, ...other } = options;

            /**
             * Firstly define notification props
             * If some props are not give they will be reset because
             * reducer destructures INITIAL_STATE
             * */
            let answer = await dispatch(setNotification({
                text: getTranslation(getState().localize, text),
                ...other
            }));

            /** Secondly open notification */
            if (answer) {
                dispatch(openNotification());

                _timeout = setTimeout(() => {
                    /** Thirdly close notification */
                    dispatch(closeNotification());
                    clearTimeout(_timeout);
                }, autoHideduration);

                answer = null // GC
            }
    }
);

export default {
    onOpenNotification
};