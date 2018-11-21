import { invalidError } from '../app/_common/';

const { NOT_EMPTY, NO_SPACES } = invalidError;

const rules = {
    [NO_SPACES]: value => !(/.*[\s].*/.test(value)),
    [NOT_EMPTY]: value => value && value.length
};

export const helperTexts = {
    [NO_SPACES]:
     (value: string) => (
        `Spaces not allowed in ${value.toLowerCase()}.`
    ),
    [NOT_EMPTY]: (value: string) => (
        `${value[0].toUpperCase()}${value.slice(1)} cannot be empty.`
    )
};

export const applyRules = (value: string, _rules: invalidError[] = []): string | undefined => {
    for (const rule in _rules) {
        const ruleName = _rules[rule];
        const ruleEnum = invalidError[ruleName];
        if(!rules[ruleEnum](value)) {
            return ruleEnum;
        }
    }
    return undefined;
};
