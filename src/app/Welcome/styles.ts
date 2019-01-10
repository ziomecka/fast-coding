import { createStyles } from '@material-ui/core/styles';

import {
    WELCOME_BUTTON_MARGIN_RIGHT,
    WELCOME_BUTTON_MARGIN_TOP,
    WELCOME_HEADING_OTHER_XS,
    TOOLBAR_MAX_WIDTH_SM,
    TOOLBAR_MAX_WIDTH_XS,
    TOOLBAR_MAX_WIDTH_MD,
    WELCOME_HEADING_HOME_XS,
    WELCOME_HEADING_HOME_SM
} from './constants.styles';

import {
    NAV_HEIGHT_LG,
    NAV_HEIGHT_MD,
    NAV_WELCOME_GO_UP,
    PAPER_PADDING_MAX_XS,
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_MAX_LG,
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
            padding: 0,
            position: 'fixed',
            justifyContent: 'center',
            top: 0,
            left: 0,
            backgroundColor: mainPrimary,
            borderRadius: 0,
            width: '100%',
            transition: `${ transHeightFontSizeColor }`
        },
        welcomeHome: {
            height: '100%',
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
            color: textPrimary,
            transition: theme.transitions.create(['color'], {duration: theme.transitions.duration.enteringScreen, easing: theme.transitions.easing.easeOut}),
            padding: `0 0 0 ${ PAPER_PADDING_MAX_MD }`,
            maxWidth: `calc(100% - ${ TOOLBAR_MAX_WIDTH_XS }px - ${ PAPER_PADDING_MAX_MD })`,
            overflow: 'visible',
            [theme.breakpoints.up('sm')]: {
                maxWidth: `calc(100% - ${ TOOLBAR_MAX_WIDTH_SM }px - ${ PAPER_PADDING_MAX_MD })`,
            },
            [theme.breakpoints.up('lg')]: {
                padding: `0 0 0 ${ PAPER_PADDING_MAX_LG }`,
            },
        },
        welcomeHeadingHome: {
            fontSize: WELCOME_HEADING_HOME_XS,
            [theme.breakpoints.up('sm')]: {
                fontSize: WELCOME_HEADING_HOME_SM,
            },
        },
        welcomeHeadingOther: {
            fontSize: WELCOME_HEADING_OTHER_XS,
            [theme.breakpoints.up('sm')]: {
                fontSize: WELCOME_HEADING_OTHER,
            },
            color: contrastTextSecondary,
            maxHeight: NAV_HEIGHT_MD,
            overflow: 'hidden'
        },
        welcomeButtons: {
            fontSize: '1.5em',
            paddingLeft: PAPER_PADDING_MAX_MD,
            display: 'flex',
            '& button': {
                textAlign: 'left'
            },
            flexDirection: 'column-reverse',
            [ theme.breakpoints.up('sm') ]: {
                flexDirection: 'row',
            },
            [theme.breakpoints.up('lg')]: {
                paddingLeft: PAPER_PADDING_MAX_LG
            }
        },
        welcomeButton: {
            textAlign: 'left',
            justifyContent: 'flex-start',
            margin: `${ spacingUnit * WELCOME_BUTTON_MARGIN_TOP } ${ spacingUnit * WELCOME_BUTTON_MARGIN_RIGHT } ${ spacingUnit } 0`,
            [ theme.breakpoints.up('sm') ]: {
                justifyContent: 'center',
                textAlign: 'center',
            }
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
            left: PAPER_PADDING_MAX_XS,
            width: '50%',
            [ theme.breakpoints.up('sm') ]: {
                left: PAPER_PADDING_MAX_MD,
            },
            [ theme.breakpoints.up('lg') ]: {
                left: PAPER_PADDING_MAX_LG,
                width: '70%',
            },
            display: 'inline-block',
            height: '1.5em', // dzięki temu tooltip na tej samej wysokości co inne
            backgroundColor: 'transparent',
            '&:hover': {
                backgroundColor: 'transparent'
            },
            padding: 0
        },
        welcomeHomeButton: {
            position: 'absolute',
            left: PAPER_PADDING_MAX_XS,
            padding: 0
            /** Breakpoint not needed because dispalayed only on xs
             *  CAREFUL
             */
            // [ theme.breakpoints.up('lg') ]: {
            //     left: PAPER_PADDING_MAX_LG,
            // }
        }
    };
});

export default styles;