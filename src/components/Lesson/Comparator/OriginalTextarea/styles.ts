import { createStyles } from '@material-ui/core/styles';
import {
    COLOR_SUCCESS,
    COLOR_CORRECTED,
    LESSON_MAX_WIDTH,
    LESSON_FONT_SIZE_REM,
    LESSON_PARAGRAPH_SIZE_REM
} from '@constantsStyles';

import {
    FONT_SIZE_LG,
    FONT_SIZE_MD,
    FONT_SIZE_SM,
    FONT_SIZE_XS,
} from './constants.styles';

const styles = createStyles( theme => {

    const {
        palette: {
            secondary: { main: secondaryMain, veryLight: errorColor },
            primary: { main: primaryMain }
        },
    } = theme;

    return {
        paperClass: {
            maxWidth: `${LESSON_MAX_WIDTH}px`,
            overflow: 'hidden',
            paddingTop: '2em'
        },
        paperShortClass: {
            overflow: 'hidden',
            padding: `${LESSON_FONT_SIZE_REM}rem 0`,
            maxHeight: '15rem',
            alignItems: 'center',
            margin: 0
        },
        paragraphClass: {
            height: `${LESSON_PARAGRAPH_SIZE_REM}rem`,
            overflow: 'visible',
            margin: 0,
            padding: 0,
            textAlign: 'center'
        },
        inviteTitleClass: {
            '& > span:nth-child(1)': {
                position: 'relative',
            },
            '& > span:nth-child(1):before': {
                content: '\' \'',
                display: 'inline-block',
                width: '100%',
                position: 'absolute',
                bottom: '-2px',
                left: '0px',
                height: '1px',
                animation: 'invite .4s infinite alternate'
            }
        },
        '@global': {
            '@keyframes invite': {
                '0%': {
                    borderBottom: `1px solid ${ primaryMain }`
                },
                '100%': {
                    borderBottom: `3px solid ${ secondaryMain }`
                }
            }
        },
        fontClass: {
            boxSizing: 'border-box',
            display: 'inline-block',
            margin: '.1em',
            minWidth: '1em',
            fontSize: FONT_SIZE_XS,
            [ theme.breakpoints.up( 'sm' ) ]: {
                fontSize: FONT_SIZE_SM,
            },
            [ theme.breakpoints.up( 'md' ) ]: {
                fontSize: FONT_SIZE_MD,
            },
            [ theme.breakpoints.up( 'lg' ) ]: {
                fontSize: FONT_SIZE_LG,
            },
            padding: '.15em',
            whiteSpace: 'pre',
            textAlign: 'center',
            border: `1px solid ${ primaryMain }`
        },
        fontCorrectClass: {
            backgroundColor: COLOR_SUCCESS
        },
        fontErrorClass: {
            backgroundColor: errorColor
        },
        fontCorrectedClass: {
            backgroundColor: COLOR_CORRECTED
        },
    };
} );

export default styles;
