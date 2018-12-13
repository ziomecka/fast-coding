import { Dispatch, Action } from 'redux';

import { post as postData } from '../../api';

import { AppRoutes } from '../../../_common/';
import { LoginFormResponseEnum } from './types';

const { SUCCESS } = LoginFormResponseEnum;

const { loginLog } = AppRoutes;

import { setFormHelperText } from '../../FormHelperText/_duck/actions';

export const onLog = (login, password): any => async (dispatch: Dispatch) => {
    /** removes formInvalid message */
    dispatch(setFormHelperText('formBeingSent'));

    const response = await postData({path: loginLog, body: { login, password }});
    // @ts-ignore
    const { result } = JSON.parse(response || null);

    if (result === SUCCESS) {
        return dispatch(setFormHelperText(null));
    } else {
        return dispatch(setFormHelperText(LoginFormResponseEnum[result]));
    }
};

export default {
    onLog
};