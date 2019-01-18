import { CoursesGrid } from './_duck/';

import { MediaEnum } from '@app/Media/';

const { lg, md, sm, xl, xs } = MediaEnum;

export const COURSES_GRID: CoursesGrid = new Map( [
    [ xs, { cols: 1 } ],
    [ sm, { cols: 1 } ],
    [ md, { cols: 2 } ],
    [ lg, { cols: 3 } ],
    [ xl, { cols: 3 } ],
] );
