import { Dispatch } from 'redux';

import { post as postData } from '../../api';

import { invalidError } from '../../_common';

import { AppRoutes } from '../../../_common/';
import { LoginFormResponseEnum } from './types';

const { SUCCESS } = LoginFormResponseEnum;

const { loginLog } = AppRoutes;

import { setFormHelperText } from '../../FormHelperText/_duck/actions';

export const onLog = (login, password): any => async (dispatch: Dispatch) => {
    const response = await postData({path: loginLog, body: { login, password }});
    // @ts-ignore
    const { result } = JSON.parse(response || null);

    if (result === SUCCESS) {
        return dispatch(setFormHelperText(null));
    } else {
        return dispatch(setFormHelperText(LoginFormResponseEnum[result]));
    }
};

const rules = {
    noSpaces: value => !(/.*[\s].*/.test(value)),
    notEmpty: value => value && value.length
};

const applyRules = (value: string = '', _rules: string[] = []): string | undefined => {
    for (const rule in _rules) {
        if (!rules[_rules[rule]](value)) {
            return invalidError[_rules[rule]]
        }
    }
    return undefined;
};

export default {
    onLog,
    applyRules
};