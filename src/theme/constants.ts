export * from '@app/Nav/constants.styles';
export * from '@components/Lesson/constants.styles';
export {
    SPACING_BEETWEEN_LESSONS,
    COURSE_BACKGROUND_GREY,
    GRID
} from '@components/Course/constants.styles';

export { WELCOME_HEADING_OTHER_XS } from '@app/Welcome/constants.styles';

export {
    FOOTER_HEIGHT_LG,
    FOOTER_HEIGHT_MD
} from '@app/Footer/constants.styles';

/** PADDING */
export const PAPER_PADDING_XS = '.5rem';
export const PAPER_PADDING_MD = '1rem';
export const PAPER_PADDING_LG = '2rem';

export const PAPER_PADDING_MAX_XS = '1rem';
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
export const MEDIA_DESKTOP_XS = 0;
export const MEDIA_DESKTOP_SM = 600;
export const MEDIA_DESKTOP_MD = 960;
export const MEDIA_DESKTOP_LG = 1280;
export const MEDIA_DESKTOP_XL = 1920;

export const LINE_HEIGHT = '1.5em';
export const LINE_HEIGHT_H = '1.1em';

export const FONT_WEIGHT_LIGHT = 400;
export const FONT_WEIGHT = 500;
export const FONT_WEIGHT_BOLD = 600;

/** TYPOGRAPHY */
/** Only for h1 and h2 as only those displayed in screens xs - md
 *  See: NotDesktop component
 *  lineHeight: 1.3 times FONT_SIZE
*/
export const FONT_SIZE = {
    FONT_SIZE_h1: '3em',
    FONT_SIZE_h2: '3em',
    FONT_SIZE_h3: '2em',
    FONT_SIZE_h4: '1.4em',
    FONT_SIZE_h5: '1.2em',
    FONT_SIZE_h6: '1em',
};
