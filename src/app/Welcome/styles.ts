import { createStyles } from '@material-ui/core/styles';

import {
    WELCOME_BUTTON_MARGIN_RIGHT,
    WELCOME_BUTTON_MARGIN_TOP,
    TOOLBAR_MAX_WIDTH
} from './constants.styles';

import {
    NAV_HEIGHT_LG,
    NAV_HEIGHT_MD,
    NAV_WELCOME_GO_UP,
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_MAX_LG
} from '@constantsStyles';

const styles = createStyles(theme => {
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
        spacing: { unit: spacingUnit },
        typography: {
            h2: { fontSize: WELCOME_HEADING_OTHER }
        }
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
            justifyContent: 'flex-start',
            padding: 0,
            [ theme.breakpoints.up('md') ]: {
                position: 'fixed',
                justifyContent: 'center'
            },
            top: 0,
            left: 0,
            backgroundColor: mainPrimary,
            borderRadius: 0,
            width: '100%',
            transition: `${ transHeightFontSizeColor }`
        },
        welcomeHome: {
            [ theme.breakpoints.up('md') ]: {
                height: '100%',
            },
        },
        welcomeOther: {
            height: `${ NAV_HEIGHT_MD }px`,
            maxHeight: `${ NAV_HEIGHT_MD }px`,
            [ theme.breakpoints.up('lg')]: {
                height: `${ NAV_HEIGHT_LG }px`,
                maxHeight: `${ NAV_HEIGHT_LG }px`,
            },
            color: textPrimary
        },
        welcomeLesson: {
            top: `-${ NAV_HEIGHT_MD }px`,
            maxHeight: `${ NAV_HEIGHT_MD }px`,
            [ theme.breakpoints.up('lg')]: {
                top: `-${ NAV_HEIGHT_LG }px`,
                maxHeight: `${ NAV_HEIGHT_LG }px`,
            },
        },
        welcomeHeading: {
            display: 'inline-block',
            color: contrastTextSecondary,
            transition: theme.transitions.create(['color'], {duration: theme.transitions.duration.enteringScreen, easing: theme.transitions.easing.easeOut}),
            padding: `0 0 0 ${ PAPER_PADDING_MAX_MD }`,
            maxWidth: `calc(100% - ${ PAPER_PADDING_MAX_MD } - ${ PAPER_PADDING_MAX_MD } - ${ TOOLBAR_MAX_WIDTH })`,
            [theme.breakpoints.up('md')]: {
                color: textPrimary,
            },
            [theme.breakpoints.up('lg')]: {
                padding: `0 0 0 ${ PAPER_PADDING_MAX_LG }`,
                maxWidth: `calc(100% - ${ PAPER_PADDING_MAX_LG } - ${ PAPER_PADDING_MAX_LG } - ${ TOOLBAR_MAX_WIDTH })`,
            },
        },
        welcomeHeadingOther: {
            fontSize: WELCOME_HEADING_OTHER_XS,
            [theme.breakpoints.up('sm')]: {
                fontSize: WELCOME_HEADING_OTHER,
            },
            color: contrastTextSecondary,
        },
        welcomeButtons: {
            fontSize: '1.5em',
            paddingLeft: PAPER_PADDING_MAX_MD,
            [theme.breakpoints.up('lg')]: {
                paddingLeft: PAPER_PADDING_MAX_LG
            }
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
            left: PAPER_PADDING_MAX_MD,
            [ theme.breakpoints.up('lg') ]: {
                left: PAPER_PADDING_MAX_LG,
            },
            display: 'inline-block',
            width: '50%', // arbitrary value
            height: '1.5em', // dzięki temu tooltip na tej samej wysokości co inne
            backgroundColor: 'transparent',
            '&:hover': {
                backgroundColor: 'transparent'
            }
        }
    };
});

export default styles;