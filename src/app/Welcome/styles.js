import {
    NAV_HEIGHT,
    WELCOME_BUTTON_MARGIN_RIGHT,
    WELCOME_BUTTON_MARGIN_TOP,
    NAV_WELCOME_GO_UP,
    PAPER_PADDING_MAX
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

    const transHeightFontSizeColor = `${ theme.transitions.create(
        ['height', 'font-size' ], { duration: complex, easing: easeOut },
    ) }, ${ theme.transitions.create(
        [ 'color' ], { duration: shorter, easing: easeOut }
    ) }, ${ theme.transitions.create(
        ['top' ], { duration: complex * NAV_WELCOME_GO_UP, easing: easeOut },
    ) }`;

    return {
        welcomePaper: {
            alignItems: 'flex-start',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            padding: '0',
            backgroundColor: mainPrimary,
            borderRadius: 0,
            width: '100%',
            transition: `${ transHeightFontSizeColor }`
        },
        welcomeHome: {
            height: '100%',
            fontSize: theme.typography.pxToRem(30)
        },
        welcomeOther: {
            height: `${ NAV_HEIGHT }px`,
            fontSize: theme.typography.pxToRem(16),
            color: textPrimary
        },
        welcomeLesson: {
            top: `-${ NAV_HEIGHT }px`
        },
        welcomeHeading: {
            display: 'inline-block',
            color: textPrimary,
            transition: theme.transitions.create(['color'], {duration: theme.transitions.duration.enteringScreen, easing: theme.transitions.easing.easeOut}),
            padding: `0 ${ PAPER_PADDING_MAX }`,
        },
        welcomeHeadingOther: {
            position: 'relative',
            fontSize: theme.typography.display2.fontSize,
            color: contrastTextSecondary
        },
        welcomeButtons: {
            paddingLeft: PAPER_PADDING_MAX
        },
        welcomeButton: {
            margin: `${ spacingUnit * WELCOME_BUTTON_MARGIN_TOP } ${ spacingUnit * WELCOME_BUTTON_MARGIN_RIGHT } ${ spacingUnit } 0`,
        },
        fallingLetters: {
            position: 'relative',
        },
        welcomeButtonMain: {
            backgroundColor: mainSecondary
        },
        /** Link to Welcome page
         *  Hidden, under title, rendered on not Welcome page
         */
        welcomeHomeSubMenu: {
            position: 'absolute',
            left: PAPER_PADDING_MAX,
            display: 'inline-block',
            width: '50%', // arbitrary value
            height: '1.5em', // dzięki temu tooltip na tej samej wysokości co inne
            backgroundColor: 'transparent',
            '&:hover': {
                backgroundColor: 'transparent'
            }
        }
    };
};

export default styles;