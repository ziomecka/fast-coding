import {
    NAV_HEIGHT,
    WELCOME_BUTTON_MARGIN_RIGHT,
    WELCOME_BUTTON_MARGIN_TOP
} from '../../constants';

const styles = theme => {
    const {
        palette: {
            primary: { main: mainPrimary },
            secondary: { main: mainSecondary, contrastText: contrastTextSecondary },
            text: { primary: textPrimary }
        },
        transitions: {
            duration: { complex, shorter },
            easing: { easeOut }
        },
        spacing: { unit: spacingUnit }
    } = theme;

    const transHeightFontSizeColor = `${theme.transitions.create(
        ['height', 'font-size' ], { duration: complex, easing: easeOut },
    )}, ${theme.transitions.create(
        [ 'color' ], { duration: shorter, easing: easeOut }
    )}`;

    return {
        welcomePaper: {
            alignItems: 'flex-start',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: mainPrimary,
            borderRadius: 0
        },
        welcomeHome: {
            height: '100%',
            width: '100%',
            fontSize: theme.typography.pxToRem(30),
            transition: `${transHeightFontSizeColor}, width 0s linear 0s`,
        },
        welcomeOther: {
            height: `${NAV_HEIGHT}px`,
            fontSize: theme.typography.pxToRem(16),
            color: textPrimary,
            transition: `${transHeightFontSizeColor}, width 0s linear .${complex + 2}s`,
        },
        welcomeHeading: {
            color: textPrimary,
            transition: theme.transitions.create(['color'], {duration: theme.transitions.duration.enteringScreen, easing: theme.transitions.easing.easeOut}),
        },
        welcomeHeadingOther: {
            position: 'relative',
            fontSize: theme.typography.display2.fontSize,
            color: contrastTextSecondary
        },
        welcomeButton: {
            margin: `${spacingUnit * WELCOME_BUTTON_MARGIN_TOP} ${spacingUnit * WELCOME_BUTTON_MARGIN_RIGHT} ${spacingUnit} 0`,
        },
        fallingLetters: {
            position: 'relative',
        },
        welcomeButtonMain: {
            backgroundColor: mainSecondary
        },
        welcomeHomeSubMenu: {
            position: 'absolute',
            left: 0,
            display: 'inline-block',
            width: '50%', // arbitrary value
            height: '100%',
            padding: 0,
            backgroundColor: 'transparent',
            '&:hover': {
                backgroundColor: 'transparent'
            }
        }
    };
};

export default styles;