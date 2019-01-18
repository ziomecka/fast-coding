import {
    backspace,
    escape,
    space,
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
export const isSpace = ( code: number ): boolean => code === space;
