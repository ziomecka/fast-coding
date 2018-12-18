import { Dispatch, Action } from 'redux';

import { AppRoutes } from '@appTypes';

import { NewPasswordFormResponseEnum } from './types';

import { SendFormNewPasswordFormI } from './types';

const { SUCCESS, INVALID_REMIND_PASSWORD_LINK } = NewPasswordFormResponseEnum;
const { newPassword, login } = AppRoutes;

import { onSendForm as _onSendForm } from '../../Form/_duck/operations';

export const onSendForm = (options: SendFormNewPasswordFormI ): any => (
    async ( dispatch: Dispatch): Promise<Action> => {
        return await dispatch( _onSendForm( {
            request: {
                path: newPassword,
                // @ts-ignore
                body: options,
            },
            success: {
                value: SUCCESS,
                errorNotifications: {
                    [INVALID_REMIND_PASSWORD_LINK]: 'notificationNewPasswordFormInvalidLink'
                },
                successNotification: 'notificationNewPasswordSuccess',
                redirectUrl: login
            }
        } ));
    }
);

export default {
    onSendForm
};