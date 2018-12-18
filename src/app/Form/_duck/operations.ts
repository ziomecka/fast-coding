import { Dispatch, Action } from 'redux';
import { setFormHelperText } from '../../FormHelperText/_duck/actions';
import { SendFormI } from './types';
import { post as postData } from '../../api/';

import { ThunkGetStateType, ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';

import { onOpenNotification } from '../../Notification/_duck/operations';

import history from '../../../shared/history';

const { app } = ApplicationContainersEnum;
const { user } = AppContainersEnum;

export const onFormInvalid = (): any => (
    async ( dispatch: Dispatch ): Promise<Action> => {
        return dispatch(setFormHelperText('formInvalid'));
    }
);

export const onSendForm = (options: SendFormI): any => (
    async ( dispatch: Dispatch, getState: ThunkGetStateType ): Promise<Action> => {
        /** Add login to each request */
        // @ts-ignore
        const { request: { body: { login } }, success: { value: success, redirectUrl, successNotification, errorNotifications } } = options;
        Object.assign(options.request.body, { login: login || getState()[app][user].login });

        /** removes formInvalid message */
        dispatch(setFormHelperText('formBeingSent'));

        const response = await postData({ ...options.request });

        const { result } = response || null;

        if (result === success) {
            if (redirectUrl) history.push(redirectUrl);
            return dispatch(onOpenNotification({ text: successNotification }));
        }

        /** Display error
         *  Either passed or standard error
        */
        return dispatch(setFormHelperText(errorNotifications[result] || 'ERROR' ));
    }
);