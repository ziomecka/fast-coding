import { createStyles } from '@material-ui/core/styles';

import {
    WELCOME_HEADING_OTHER_XS,
    TOOLBAR_MAX_WIDTH_SM,
    TOOLBAR_MAX_WIDTH_XS,
    WELCOME_HEADING_HOME_XS,
    WELCOME_HEADING_HOME_SM
} from './constants.styles';

import {
    NAV_HEIGHT_MD,
    PAPER_PADDING_MAX_XS,
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_MAX_LG,
} from '@constantsStyles';

const styles = createStyles( theme => {
    const {
        palette: {
            secondary: { contrastText: contrastTextSecondary },
            text: { primary: textPrimary }
        },
        typography: {
            h2: { fontSize: WELCOME_HEADING_OTHER }
        }
    } = theme;

    return {
        welcomeHeadingHeading: {
            display: 'inline-block',
            color: textPrimary,
            transition: theme.transitions.create( [ 'color' ], { duration: theme.transitions.duration.enteringScreen, easing: theme.transitions.easing.easeOut } ),
            padding: `0 0 0 ${ PAPER_PADDING_MAX_MD }`,
            maxWidth: `calc(100% - ${ TOOLBAR_MAX_WIDTH_XS }px - ${ PAPER_PADDING_MAX_MD })`,
            overflow: 'visible',
            [ theme.breakpoints.up( 'sm' ) ]: {
                maxWidth: `calc(100% - ${ TOOLBAR_MAX_WIDTH_SM }px - ${ PAPER_PADDING_MAX_MD })`,
            },
            [ theme.breakpoints.up( 'lg' ) ]: {
                padding: `0 0 0 ${ PAPER_PADDING_MAX_LG }`,
            },
        },
        welcomeHeadingHeadingHome: {
            fontSize: WELCOME_HEADING_HOME_XS,
            [ theme.breakpoints.up( 'sm' ) ]: {
                fontSize: WELCOME_HEADING_HOME_SM,
            },
        },
        welcomeHeadingHeadingOther: {
            fontSize: WELCOME_HEADING_OTHER_XS,
            [ theme.breakpoints.up( 'sm' ) ]: {
                fontSize: WELCOME_HEADING_OTHER,
            },
            color: contrastTextSecondary,
            maxHeight: NAV_HEIGHT_MD,
            overflow: 'hidden'
        },
        fallingLetters: {
            position: 'relative',
        },
        /** Link to WelcomeHeading page
         *  Hidden, under title, rendered on not WelcomeHeading page
         */
        welcomeHeadingHomeSubMenu: {
            position: 'absolute',
            left: PAPER_PADDING_MAX_XS,
            width: '50%',
            [ theme.breakpoints.up( 'sm' ) ]: {
                left: PAPER_PADDING_MAX_MD,
            },
            [ theme.breakpoints.up( 'lg' ) ]: {
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
        welcomeHeadingHomeButton: {
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
} );

export default styles;
