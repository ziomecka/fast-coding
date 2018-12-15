import { Dispatch, Action } from 'redux';

import { post as postData } from '../../api';

import { AppRoutes, ThunkGetStateType } from '../../../_common/';
import { LoginFormResponseEnum } from './types';

const { SUCCESS } = LoginFormResponseEnum;

const { loginLog, lessons } = AppRoutes;

import { setFormHelperText } from '../../FormHelperText/_duck/actions';
import { authorizeUser } from  '../../User/_duck/actions';
import history from '../../../shared/history';

import { onOpenNotification } from '../../Notification/_duck/operations';
import getTranslation from '../../../shared/get.translation';

export const onLog = (login, password): any => async (dispatch: Dispatch, getState: ThunkGetStateType  ): Promise<Action> => {
    /** removes formInvalid message */
    dispatch(setFormHelperText('formBeingSent'));

    const { result } = await postData({path: loginLog, body: { login, password }});

    if (result === SUCCESS) {
        dispatch(authorizeUser(login));
        history.push(lessons);
        return dispatch(onOpenNotification(getTranslation(getState().localize, 'notificationAuthorized')));
    }

    // TODO make error 0. Spojnie wszedzie
    return dispatch(setFormHelperText(LoginFormResponseEnum[result] || LoginFormResponseEnum[3]));

};

export default {
    onLog
};