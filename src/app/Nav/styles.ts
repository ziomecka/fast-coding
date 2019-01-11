import { createStyles } from '@material-ui/core/styles';

import {
    NAV_HEIGHT_MD,
    NAV_HEIGHT_LG,
    NAV_WELCOME_GO_UP,
    LOGIN_FONT_SIZE,
    LOGIN_LINE_HEIGHT,
    LOGIN_LETTER_SPACING,
    LOGIN_WIDTH
} from './constants.styles';

const style = createStyles( theme => {

    const {
        transitions: {
            duration: { complex },
            easing: { easeOut }
        },
        palette: {
            secondary: { contrastText: loginColor }
        },
        typography: { fontWeightMedium: loginFontWeight },
        spacing: { unit: spacingUnit }
    } = theme;

    return {
        navClass: {
            transition: `${theme.transitions.create(
                ['top' ], { duration: complex * NAV_WELCOME_GO_UP, easing: easeOut} )}`
        },
        navLessonClass: {
            top: `-${ NAV_HEIGHT_MD }px`,
            [theme.breakpoints.up( 'sm' )]: {
                top: `-${ NAV_HEIGHT_LG }px`,
            }
        },
        navLogin: {
            '&:after': {
                display: 'block',
                content: 'attr(login)',
                position: 'absolute',
                right: 0,
                top: -spacingUnit * 2,
                fontSize: LOGIN_FONT_SIZE,
                fontWeight: loginFontWeight,
                letterSpacing: LOGIN_LETTER_SPACING,
                color: loginColor,
                whiteSpace: 'nowrap',
                marginTop: 0,
                lineHeight: LOGIN_LINE_HEIGHT, // decreased i case login takes upto three lines
                [ theme.breakpoints.up( 'sm' )]: { // up('sm') because from sm main headline is displayed
                    width: LOGIN_WIDTH,
                    right: 'auto',
                    left: '50%',
                    top: '100%',
                    transform: 'translateX(-50%)',
                    whiteSpace: 'normal'
                }
            }
        }
    };
} );

export default style;
