export * from '@app/Nav/constants.styles';
export * from '@components/Lesson/constants.styles';
export { SPACING_BEETWEEN_LESSONS, COLS_LG, COLS_MD } from '@components/Course/constants.styles';

/** PADDING */
export const PAPER_PADDING_MD = '1rem';
export const PAPER_PADDING_LG = '2rem';

export const PAPER_PADDING_MAX_MD = '3rem';
export const PAPER_PADDING_MAX_LG = '6rem';

/** ELEVATION */
export const ELEVATION = 2;

/** COLORS */
export const COLOR_SUCCESS = '#c5ebc3';
export const COLOR_CORRECTED = '#fcefe7';
export const COLOR_HINTS = '#90ab8e';

/** BORDER */
export const BORDER_THIN = '.5px';

/** BREAKPOINTS */
export const MEDIA_DESKTOP_MD = 960;
export const MEDIA_DESKTOP_LG = 1280;

/** TYPOGRAPHY */
/** Only for h1 and h2 as only those displayed in screens xs - md
 *  See: NotDesktop component
 *  lineHeight: 1.3 times FONT_SIZE
*/
export const FONT_SIZE = {
    FONT_SIZE_h1_xs: '2rem',
    FONT_SIZE_h1_sm: '3rem',
    FONT_SIZE_h1_md: '4rem',
    LINE_HEIGHT_h1_xs: '2.6rem',
    LINE_HEIGHT_h1_sm: '3.9rem',
    LINE_HEIGHT_h1_md: '5.2rem',

    FONT_SIZE_h2_xs: '1.5rem',
    FONT_SIZE_h2_sm: '2rem',
    FONT_SIZE_h2_md: '3rem',
    LINE_HEIGHT_h2_xs: '1.95rem',
    LINE_HEIGHT_h2_sm: '2.6rem',
    LINE_HEIGHT_h2_md: '3.9rem'
};