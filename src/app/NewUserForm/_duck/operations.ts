import { Dispatch, Action } from 'redux';

import { post as postData } from '../../api/';
import { AppRoutesEnum } from '@appTypes';

import { NewUserFormResponseEnum } from './types';

import { setFormHelperText } from '../../FormHelperText/_duck/actions';
import { authorizeUser } from  '../../User/_duck/actions';
import history from '@shared/history';

import { onOpenNotification } from '../../Notification/_duck/operations';

const { SUCCESS } = NewUserFormResponseEnum;
const { newUserSet, lessons } = AppRoutesEnum;

export const onSendNewUserForm = (login: string, password: string, email: string ): any => (
    async ( dispatch: Dispatch ): Promise<Action> => {
        /** removes formInvalid message */
        dispatch(setFormHelperText('formBeingSent'));

        const { result } = await postData({ path: newUserSet, body: { login, password, email }});

        if (result === SUCCESS) {
            dispatch(authorizeUser(login));
            history.push(lessons);
            return dispatch(onOpenNotification({ text: 'notificationAuthorized' }));
        }

        return dispatch(setFormHelperText(NewUserFormResponseEnum[result] || NewUserFormResponseEnum[0]));
    }
);

export default {};