import { Dispatch, Action } from 'redux';
import { AppContainers } from '../../../_common/';
import { validatePassword } from './actions';

import { applyRules, RulesDataI, invalidError } from '../../../shared/rules';

export const onValidatePassword = (password: string, passwordType, container: AppContainers, rules: invalidError[], value2: string = ''): any => (
    (dispatch: Dispatch): Action => {
        return dispatch(validatePassword(
            applyRules( rules.map(rule => [ rule, { value: password, value2 } ]) as [ invalidError, RulesDataI ][]),
            passwordType,
            container
        ));
    }
);