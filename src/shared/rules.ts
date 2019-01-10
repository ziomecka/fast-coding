import { LocalizeState } from 'react-localize-redux';
import { RulesErrorEnum } from './_types/';
import getTranslation from './get.translation';

export { RulesErrorEnum };

const {
    NO_SPACES,
    NOT_LONG,
    NOT_EMAIL,
    NO_DIGIT,
    NO_SPECIALS,
    NO_MATCH,
    MATCH
} = RulesErrorEnum;

export const rulesRegexp: RulesRegexpI = {
    [NO_SPACES]: () => /.*[\s].*/,
    [NOT_LONG]: ( min, max ) => RegExp( `^.{${min},${max}}$` ),
    [NOT_EMAIL]: () => /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    [NO_DIGIT]: () => /^.*[0-9]{1,}.*$/,
    [NO_SPECIALS]: () => /.*[^a-zA-Z0-9]+.*/
};

// TODO NO_MATCH ad MATCH
// mogłoby być jedno gdbym mogła w props rules komponentu Password przekazywać inforamcję czy rule ma być spełnione czy nie
const rules: RulesI = {
    [NO_SPACES]: options => !( rulesRegexp[NO_SPACES]().test( options.value ) ),
    [NOT_LONG]: options => ( rulesRegexp[NOT_LONG]( options.min, options.max ).test( options.value ) ),
    [NOT_EMAIL]: options => ( rulesRegexp[NOT_EMAIL]().test( options.value ) ),
    [NO_DIGIT]: options => ( rulesRegexp[NO_DIGIT]().test( options.value ) ),
    [NO_SPECIALS]: options => ( rulesRegexp[NO_SPECIALS]().test( options.value ) ),
    [NO_MATCH]: options => options.value === options.value2,
    [MATCH]: options => options.value !== options.value2
};

export const helperTexts = ( rule, value: string, localize: LocalizeState ): string => (
    rule? getTranslation( localize, `${rule}_${value.toUpperCase()}` ) : ''
);

export const applyRules = ( options: ApplyRulesType ): string => {

    for ( const rule in options ) {
        const { value, min = 8, max = 15, value2, opposite } = options[rule][1];

        const ruleName = options[rule][0];

        const result = !rules[ruleName]( { value, min, max, value2 } );

        if ( ( result && !opposite ) || ( !result && opposite ) ) {
            return RulesErrorEnum[ruleName];
        }
    }

    return null;
};

/** Interfaces */
export type ApplyRulesType = Array<[ RulesErrorEnum, RulesDataI ]>;

interface RulesRegexpI {
    [key: string]: ( min?: number, max?: number ) => RegExp
}

export interface RulesDataI {
    value: string;
    min?: number;
    max?: number;
    value2?: string;
    opposite?: boolean;
}

interface RulesI {
    [key: string]: ( options: RulesDataI ) => boolean
}