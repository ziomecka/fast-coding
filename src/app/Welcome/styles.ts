import { createStyles } from '@material-ui/core/styles';

import {
    WELCOME_BUTTON_MARGIN_RIGHT,
    WELCOME_BUTTON_MARGIN_TOP_XS,
} from './constants.styles';

import {
    NAV_HEIGHT_LG,
    NAV_HEIGHT_MD,
    NAV_WELCOME_GO_UP,
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_MAX_LG,
} from '@constantsStyles';

const styles = createStyles( theme => {
    const {
        palette: {
            primary: { main: mainPrimary },
            secondary: { main: mainSecondary },
            text: { primary: textPrimary }
        },
        transitions: {
            duration: { complex, shorter },
            easing: { easeOut }
        },
        spacing: { unit: spacingUnit },
    } = theme;

    const transHeightFontSizeColor = `${ theme.transitions.create(
        [ 'height', 'font-size' ], { duration: complex, easing: easeOut },
    ) }, ${ theme.transitions.create(
        [ 'color' ], { duration: shorter, easing: easeOut }
    ) }, ${ theme.transitions.create(
        [ 'top' ], { duration: complex * NAV_WELCOME_GO_UP, easing: easeOut },
    ) }`;

    return {
        paperClass: {
            alignItems: 'flex-start',
            padding: 0,
            position: 'inherit',
            justifyContent: 'center',
            top: 0,
            left: 0,
            backgroundColor: mainPrimary,
            borderRadius: 0,
            width: '100%',
            transition: `${ transHeightFontSizeColor }`
        },
        homeClass: {
            height: '100vh',
        },
        otherClass: {
            [ theme.breakpoints.up( 'lg' ) ]: {
                height: `${ NAV_HEIGHT_LG }px`,
            },
            height: `${ NAV_HEIGHT_MD }px`,
            color: textPrimary
        },
        lessonClass: {
            top: `-${ NAV_HEIGHT_MD }px`,
            maxHeight: `${ NAV_HEIGHT_MD }px`,
            [ theme.breakpoints.up( 'lg' ) ]: {
                top: `-${ NAV_HEIGHT_LG }px`,
                maxHeight: `${ NAV_HEIGHT_LG }px`,
            },
        },
        buttonsClass: {
            fontSize: '1.5em',
            paddingLeft: PAPER_PADDING_MAX_MD,
            display: 'flex',
            '& button': {
                textAlign: 'left'
            },
            flexDirection: 'column-reverse',
            marginTop: `${ spacingUnit * WELCOME_BUTTON_MARGIN_TOP_XS }`,
            [ theme.breakpoints.up( 'sm' ) ]: {
                flexDirection: 'row'
            },
            [ theme.breakpoints.up( 'lg' ) ]: {
                paddingLeft: PAPER_PADDING_MAX_LG
            }
        },
        buttonClass: {
            textAlign: 'left',
            justifyContent: 'flex-start',
            margin: 0,
            marginRight: 0,
            [ theme.breakpoints.up( 'sm' ) ]: {
                marginRight: spacingUnit * WELCOME_BUTTON_MARGIN_RIGHT,
                justifyContent: 'center',
                textAlign: 'center',
            }
        },
        buttonMainClass: {
            backgroundColor: mainSecondary
        }
    };
} );

export default styles;
