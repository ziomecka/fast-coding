import { Dispatch, Action } from 'redux';

import { AppRoutesEnum } from '@appTypes';

import { NewUserFormResponseEnum, SendNewUserFormI } from './types';

const { LOGIN_EXISTS, EMAIL_EXISTS } = NewUserFormResponseEnum;

const { SUCCESS } = NewUserFormResponseEnum;
const { newUserSet } = AppRoutesEnum;

import { onSendForm as _onSendForm } from '@appForm/_duck/operations';

// TODO Redirect to login or log in

export const onSendNewUserForm = ( options: SendNewUserFormI ): any => (
    async ( dispatch: Dispatch ): Promise<Action> => {
        const { login: userLogin, password, email } = options;

        return await dispatch( _onSendForm( {
            request: {
                path: newUserSet,
                body: { login: userLogin, password, email },
            },
            success: {
                value: SUCCESS,
                errorNotifications: {
                    [ LOGIN_EXISTS ]: 'LOGIN_EXISTS',
                    [ EMAIL_EXISTS ]: 'EMAIL_EXISTS'
                },
                successNotification: 'notificationNewUserSet',
                // redirectUrl: login
            }
        } ) );
    }
);

export default {};
