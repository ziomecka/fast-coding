import {
    backspace,
    escape,
    validCodes
} from './constants';

export const isValidCode = ( code: number ): boolean => {
    return validCodes.some( range => (
        ( code >= range[ 0 ] ) &&
        ( code <= range[ 1 ] )
    ) );
};

export const isBackspace = ( code: number ): boolean => code === backspace;
export const isEscape = ( code: number ): boolean => code === escape;