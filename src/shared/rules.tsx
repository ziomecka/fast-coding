import { invalidError } from '../app/_common/';

const { NOT_EMPTY, NO_SPACES } = invalidError;

const rules = {
    [NO_SPACES]: value => !(/.*[\s].*/.test(value)),
    [NOT_EMPTY]: value => value && value.length
};

import { LocalizeState } from 'react-localize-redux';
import getTranslation from './get.translation';

export const helperTexts = (rule, value: string, localize: LocalizeState): string => (
    getTranslation(localize, `${rule}_${value.toUpperCase()}`)
);

export const applyRules = (value: string, _rules: invalidError[] = [], localize: LocalizeState): string | undefined => {
    for (const rule in _rules) {
        const ruleName = _rules[rule];
        const ruleEnum = invalidError[ruleName];
        if(!rules[ruleEnum](value)) {
            return ruleEnum;
        }
    }
    return undefined;
};
