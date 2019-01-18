import { MediaEnum } from '@app/Media/';

const { lg, md, sm, xl, xs } = MediaEnum;

export const GRID = new Map( [
    [ xs, { fontSize: '1.5rem', lettersNumber: 8, rowsNumber: 2 } ],
    [ sm, { fontSize: '2rem', lettersNumber: 10, rowsNumber: 3 } ],
    [ md, { fontSize: '3rem', lettersNumber: 10, rowsNumber: 3 } ],
    [ lg, { fontSize: '3.5rem', lettersNumber: 10, rowsNumber: 3 } ],
    [ xl, { fontSize: '3.5rem', lettersNumber: 10, rowsNumber: 3 } ],
] );

export const LETTER_MARGIN = .2;
export const LETTER_PADDING = .15;
