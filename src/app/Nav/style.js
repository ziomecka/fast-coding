import {
    NAV_HEIGHT,
    NAV_WELCOME_GO_UP
} from '@constants';

const style = theme => {
    const loginFontSize = '1.2rem';
    const loginLetterSpacing = '.005em';
    const loginWidth = '160px';
    const loginLineHeight = '.95em';

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
                fontSize: loginFontSize,
                fontWeight: loginFontWeight,
                letterSpacing: loginLetterSpacing,
                color: loginColor,
                whiteSpace: 'wrap',
                marginTop: spacingUnit,
                width: loginWidth,
                lineHeight: loginLineHeight // decreased i case login takes upto three lines
            }
        }
    }
};

export default style;