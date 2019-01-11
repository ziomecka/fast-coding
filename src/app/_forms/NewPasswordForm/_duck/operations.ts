import { Dispatch, Action } from 'redux';

import { AppRoutesServerEnum } from '@appTypes';

import { NewPasswordFormResponseEnum, SendFormNewPasswordFormI } from './types';

const { SUCCESS, INVALID_REMIND_PASSWORD_LINK } = NewPasswordFormResponseEnum;
const { newPasswordSet } = AppRoutesServerEnum;

import { onSendForm as _onSendForm } from '@appForm/_duck/operations';
import { SERVER_CONSTANTS } from '@constants';

const {
    QUERY_PARAM_KEY,
    QUERY_PARAM_EMAIL,
} = SERVER_CONSTANTS;

export const onSendForm = ( options: SendFormNewPasswordFormI ): any => (
    async ( dispatch: Dispatch ): Promise<Action> => {
        const { key, newPassword, email } = options;
        return await dispatch( _onSendForm( {
            request: {
                path: newPasswordSet,
                queries: {
                    [ QUERY_PARAM_KEY ]: key,
                    [ QUERY_PARAM_EMAIL ]: email
                },
                // @ts-ignore
                body: { newPassword }
            },
            success: {
                value: SUCCESS,
                errorNotifications: {
                    [INVALID_REMIND_PASSWORD_LINK]: 'notificationNewPasswordFormInvalidLink'
                },
                successNotification: 'notificationNewPasswordSuccess',
                // redirectUrl: login TODO HERE
            }
        } ) );
    }
);

export default {
    onSendForm
};