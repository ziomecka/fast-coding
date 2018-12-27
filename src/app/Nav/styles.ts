import { createStyles } from '@material-ui/core/styles';

import {
    NAV_HEIGHT,
    NAV_WELCOME_GO_UP,
    LOGIN_FONT_SIZE,
    LOGIN_LINE_HEIGHT,
    LOGIN_LETTER_SPACING,
    LOGIN_WIDTH
} from './constants.styles';

const style = createStyles(theme => {

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
                ['top' ], { duration: complex * NAV_WELCOME_GO_UP, easing: easeOut})}`
        },
        navLessonClass: {
            top: `-${NAV_HEIGHT}px`
        },
        navLogin: {
            '&:after': {
                display: 'block',
                content: "attr(login)",
                position: 'absolute',
                left: '50%',
                top: '100%',
                transform: 'translate(-50%, -50%)',
                fontSize: LOGIN_FONT_SIZE,
                fontWeight: loginFontWeight,
                letterSpacing: LOGIN_LETTER_SPACING,
                color: loginColor,
                whiteSpace: 'wrap',
                marginTop: spacingUnit,
                width: LOGIN_WIDTH,
                lineHeight: LOGIN_LINE_HEIGHT // decreased i case login takes upto three lines
            }
        }
    }
});

export default style;