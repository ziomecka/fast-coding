import { Dispatch, Action } from 'redux';
import { AppContainersEnum } from '@appTypes';
import { validatePassword } from './actions';

import { applyRules, RulesDataI, RulesErrorEnum } from '../../../shared/rules';

export const onValidatePassword = (password: string, passwordType, container: AppContainersEnum, rules: RulesErrorEnum[], value2: string = ''): any => (
    (dispatch: Dispatch): Action => {
        return dispatch(validatePassword(
            applyRules( rules.map(rule => [ rule, { value: password, value2 } ]) as [ RulesErrorEnum, RulesDataI ][]),
            passwordType,
            container
        ));
    }
);