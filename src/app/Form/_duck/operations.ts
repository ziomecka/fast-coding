import { Dispatch, Action } from 'redux';
import { setFormHelperText } from '@app/FormHelperText/_duck/actions';
import { SendFormI } from './types';
import { post as postData, PostResponseI } from '@app/api/';

import { ThunkGetStateType, ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';

import { onOpenNotification } from '@app/Notification/_duck/operations';

import history from '@shared/history';

import { closeDialog } from '@app/Dialog/';

const { app } = ApplicationContainersEnum;
const { user } = AppContainersEnum;

export const onFormInvalid = (): any => (
    async ( dispatch: Dispatch ): Promise<Action> => {
        return dispatch(setFormHelperText('formInvalid'));
    }
);

export const onSendForm = (options: SendFormI): any => (
    async ( dispatch: Dispatch, getState: ThunkGetStateType ): Promise<PostResponseI | Action> => {
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
            dispatch(onOpenNotification({ text: successNotification }));
            // TODO - nie wszystkie formularze otwierane w Dialog wiec ten dispatch nie zawsze jest uzasadniony
            dispatch(closeDialog());
            return response;
        }

        /** Display error
         *  Either passed or standard error
        */
        return dispatch(setFormHelperText(errorNotifications[result] || 'ERROR' ));
    }
);