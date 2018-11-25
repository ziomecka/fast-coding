import { Dispatch } from 'redux';

import { openNotification, closeNotification, setTimeNotification } from './actions';
import { NOTIFICATION_DURATION } from '../../../constants';

let timeout;

export const onOpenNotification = (text: string, time: number = NOTIFICATION_DURATION): any => (
    async (dispatch: Dispatch): Promise<any> => {
        let answer = dispatch(setTimeNotification(time));

        if (answer) {
            dispatch(openNotification(text));
            timeout = setTimeout(() => {
                dispatch(closeNotification());
                clearTimeout(timeout);
                answer = null; // GC?
            }, time)
        }
    }
);

export default {
    onOpenNotification
};