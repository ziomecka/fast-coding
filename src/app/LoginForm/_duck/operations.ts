import { Dispatch } from 'redux';
import { ApplicationState } from '../../../store';
import ApiManager from '../../../shared/apimanager';

import { invalidError } from '../../_common';

import { openDialog } from '../../Dialog/_duck/actions';
import { ThunkGetStateType } from '../../../_common/';

const onLoginForm = (): any => async (dispatch: Dispatch, getState: ThunkGetStateType) => {
    const response: {status: boolean} = await ApiManager.post();
    if (response.status) {
        dispatch(openDialog());
    } else {
        dispatch(openDialog());

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
    onLoginForm,
    applyRules
};