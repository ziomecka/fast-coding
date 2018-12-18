import { Dispatch, Action } from 'redux';

import { AppRoutes } from '@appTypes';

import { ChangePasswordFormResponseEnum } from './types';

import { SendFormChangePasswordI } from './types';

const { SUCCESS, ERROR, CURRENT_PASSWORD_ERROR } = ChangePasswordFormResponseEnum;
const { changePassword, lessons } = AppRoutes;

import { onSendForm as _onSendForm } from '../../Form/_duck/operations';

export const onSendForm = (options: SendFormChangePasswordI ): any => (
    async ( dispatch: Dispatch): Promise<Action> => {
        return await dispatch( _onSendForm( {
            request: {
                path: changePassword,
                body: options
            },
            success: {
                value: SUCCESS,
                redirectUrl: lessons,
                errorNotifications: {
                    [CURRENT_PASSWORD_ERROR]: ChangePasswordFormResponseEnum[CURRENT_PASSWORD_ERROR]
                },
                successNotification: 'notificationPasswordChangeSuccess'
            }
        } ));
    }
);

export default {};