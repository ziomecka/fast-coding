import { invalidError } from './_types/';
export { invalidError };

const { NOT_EMPTY, NO_SPACES, NOT_LONG, NOT_EMAIL, NO_DIGIT, NO_SPECIALS, NO_MATCH } = invalidError;

export const rulesRegexp: RulesRegexpI = {
    [NO_SPACES]: () => /.*[\s].*/,
    [NOT_LONG]: (min, max) => RegExp(`^.{${min},${max}}$`),
    [NOT_EMAIL]: () => /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    [NO_DIGIT]: () => /^.*[0-9]{1,}.*$/,
    [NO_SPECIALS]: () => /.*[^a-zA-Z0-9]+.*/
};

const rules: RulesI = {
    [NO_SPACES]: options => !( rulesRegexp[NO_SPACES]().test(options.value) ),
    [NOT_EMPTY]: options => options.value && !!options.value.length,
    [NOT_LONG]: options => ( rulesRegexp[NOT_LONG](options.min, options.max).test(options.value) ),
    [NOT_EMAIL]: options => ( rulesRegexp[NOT_EMAIL]().test(options.value) ),
    [NO_DIGIT]: options => ( rulesRegexp[NO_DIGIT]().test(options.value) ),
    [NO_SPECIALS]: options => ( rulesRegexp[NO_SPECIALS]().test(options.value) ),
    [NO_MATCH]: options => options.value === options.value2
};

import { LocalizeState } from 'react-localize-redux';
import getTranslation from './get.translation';

export const helperTexts = (rule, value: string, localize: LocalizeState): string => (
    getTranslation(localize, `${rule}_${value.toUpperCase()}`)
);

export const applyRules = (options: ApplyRulesType): string | undefined => {

    for (const rule in options) {
        const { value, min = 8, max = 15, value2, opposite } = options[rule][1];

        const ruleName = options[rule][0];

        const ruleEnum = invalidError[ruleName];

        const result = !rules[ruleEnum]({ value, min, max, value2 });

        if ( ( result && !opposite ) || ( !result && opposite ) ) {
            return ruleEnum;
        }
    }

    return undefined;
};

/** Interfaces */
export type ApplyRulesType = Array<[ invalidError, RulesDataI ]>;

interface RulesRegexpI {
    [key: string]: (min?: number, max?: number) => RegExp
};

export interface RulesDataI {
    value: string;
    min?: number;
    max?: number;
    value2?: string;
    opposite?: boolean;
};

interface RulesI {
    [key: string]: (options: RulesDataI) => boolean
};