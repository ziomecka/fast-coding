import { MediaEnum } from '@app/Media';
import { CourseGrid } from './_duck/types';

const { lg, md, sm, xl, xs } = MediaEnum;

export const COLUMNS = 2;
export const SPACING_BEETWEEN_LESSONS = 2;
export const TRANSITION_DURATION = 'complex';

export const SVG_SIZE_MD = '2rem';
export const SVG_SIZE_LG = '2rem';

export const GRID: CourseGrid = new Map( [
    [ xs, { cols: 1, cellHeight: 60, rows: 4 } ],
    [ sm, { cols: 2, cellHeight: 150, rows: 2 } ],
    [ md, { cols: 3, cellHeight: 200, rows: 2 } ],
    [ lg, { cols: 4, cellHeight: 225, rows: 2 } ],
    [ xl, { cols: 5, cellHeight: 225, rows: 2 } ]
] );

export const COURSE_BACKGROUND_GREY = 100;
export const SUMMARY_DESCRIPTION_PADDING_TOP = '1em';
