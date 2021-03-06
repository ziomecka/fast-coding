import { Dispatch, Action } from 'redux';

import { AppRoutesServerEnum } from '@appTypes';

import { RemindPasswordResponseEnum, SendFormRemindPasswordI } from './types';

const { SUCCESS, EMAIL_DOES_NOT_EXIST } = RemindPasswordResponseEnum;
const { remindPassword } = AppRoutesServerEnum;

import { onSendForm as _onSendForm } from '@appForm/_duck/operations';

export const onSendForm = ( options: SendFormRemindPasswordI ): any => (
    async ( dispatch: Dispatch ): Promise<Action> => {
        return await dispatch( _onSendForm( {
            request: {
                path: remindPassword,
                body: options,
            },
            success: {
                value: SUCCESS,
                errorNotifications: {
                    [ EMAIL_DOES_NOT_EXIST ]: 'notificationRemindPasswordEmailDoesNotExist'
                },
                successNotification: 'notificationPasswordRemindSuccess'
            }
        } ) );
    }
);

export default {
    onSendForm
};
