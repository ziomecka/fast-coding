import { Dispatch, Action } from 'redux';

import{ authorizeUser } from '@app/User/';

import { AppRoutesEnum, UserAuthorizationMethodEnum } from '@appTypes';
import { LoginFormResponseEnum, SendLoginFormI } from './types';

const { SUCCESS, INCORRECT_PASSWORD, LOGIN_DOES_NOT_EXIST } = LoginFormResponseEnum;

const { loginLog, lessons } = AppRoutesEnum;

const { fastcoding } = UserAuthorizationMethodEnum;

import { onSendForm as _onSendForm } from '@app/Form/';

export const onLog = (options: SendLoginFormI): any => (
    async (dispatch: Dispatch ): Promise<Action> => {
        const { login, password } = options;

        let response = await dispatch( _onSendForm( {
            request: {
                path: loginLog,
                body: { login, password },
            },
            success: {
                value: SUCCESS,
                errorNotifications: {
                    [ INCORRECT_PASSWORD ]: 'INCORRECT_PASSWORD',
                    [ LOGIN_DOES_NOT_EXIST ]: 'LOGIN_DOES_NOT_EXIST'
                },
                successNotification: 'notificationAuthorized',
                redirectUrl: lessons
            }
        } ));

        /** Authorize user */
        if ( response.result === SUCCESS ) {
            response = null; // GC
            return dispatch(authorizeUser({
                login,
                authorizationMethod: fastcoding
            }));
        }
    }
);

export default {
    onLog
};