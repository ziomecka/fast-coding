import { Dispatch, Action } from 'redux';

import { post as postData } from '../../api/';
import { AppRoutes } from '../../../_common/';
import { NewUserFormResponseEnum } from './types';

import { setFormHelperText } from '../../FormHelperText/_duck/actions';

const { SUCCESS } = NewUserFormResponseEnum;
const { newUserSet } = AppRoutes;

const sendNewUserFormSuccess = (): any => async ( dispatch: Dispatch ): Promise<any> => {};

export const onSendNewUserForm = (login: string, password: string, email: string ): any => (
    async ( dispatch: Dispatch ): Promise<Action> => {
        const response = await postData({ path: newUserSet, body: { login, password, email }});
        // @ts-ignore
        const { result } = JSON.parse(response || null);

        if (result === SUCCESS) {
            dispatch(setFormHelperText(null)); // TODO should not be needed if redirected
            return dispatch(sendNewUserFormSuccess());
        }
        else {
            return dispatch(setFormHelperText(NewUserFormResponseEnum[result]));
        }
    }
);

export default {};