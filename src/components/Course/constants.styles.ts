import { MediaEnum } from '@app/Media';
import { CourseGrid } from './_duck/types';

const { lg, md, sm, xl, xs } = MediaEnum;

// TODO remove
export const COURSE_HEIGHT_MD = 200;
export const COURSE_HEIGHT_LG = 225;

export const COLUMNS = 2;
export const SPACING_BEETWEEN_LESSONS = 2;
export const TRANSITION_DURATION = 'complex';
export const COURSE_NUMBER_OF_ROWS_DISPLAYED = 2;

export const SVG_SIZE_MD = '2rem';
export const SVG_SIZE_LG = '2rem';

export const GRID: CourseGrid = new Map( [
    [ xs, { cols: 1, cellHeight: 200 }],
    [ sm, { cols: 2, cellHeight: 200 }],
    [ md, { cols: 3, cellHeight: 200 }],
    [ lg, { cols: 4, cellHeight: 225 }],
    [ xl, { cols: 5, cellHeight: 225 }]
] );

export const COURSE_BACKGROUND_GREY = 100;