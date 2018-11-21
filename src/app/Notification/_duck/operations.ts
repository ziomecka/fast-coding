import { Dispatch } from 'redux';
import { closeNotification, openNotification } from './actions';

export const onOpenNotification = (text: string, time?: number): any => (
    async (dispatch: Dispatch): Promise<any> => {
        if (time) {
            const timeout = setTimeout(() => {
                dispatch(closeNotification());
                clearTimeout(timeout);
            }, time);
        }

        dispatch(openNotification(text));
    }
);

export default {
    onOpenNotification
};