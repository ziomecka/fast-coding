// TODO - keycode differs between browsers
/**
 * @constant {array}
 * [32] - space
 * [48, 90] - digits, letters
 * [96, 111] - numpad
 * [173, 173] - minus in Firefox
 * [186, 192] - special chars
 * [219, 222] - special chars
 */
export const validCodes = [
    [ 32, 32 ],
    [ 48, 90 ],
    [ 96, 111 ],
    [ 173, 173 ],
    [ 186, 192 ],
    [ 219, 222 ],
];

export const backspace = 8;
export const escape = 27;
export const space = 32;
