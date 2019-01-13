import { MediaEnum } from '@app/Media/';
import { createStyles } from '@material-ui/core/styles';

import {
    COLOR_SUCCESS,
    COLOR_CORRECTED,
} from '@constantsStyles';

import {
    GRID,
    LETTER_MARGIN,
    LETTER_PADDING
} from './constants.styles';

const { lg, md, sm, xl, xs } = MediaEnum;

const styles = createStyles( theme => {
    const {
        palette: {
            secondary: { main: secondaryMain, veryLight: errorColor },
            primary: { main: primaryMain }
        },
    } = theme;

    const letterHeight = 1 + ( LETTER_PADDING + LETTER_MARGIN ) * 2;

    const props = ( media: MediaEnum ) => ({
        fontSize: GRID.get( media ).fontSize,
        maxWidth: `calc( ( 1em + ${ LETTER_MARGIN }em * 2 ) * ${ GRID.get( media ).lettersNumber })`,
        '& div': {
            maxHeight: `calc(( ${ letterHeight }em + 2px ) * ${ GRID.get( media ).rowsNumber })`,
        },
    });

    return {
        paperClass: {
            marginTop: '2rem',
            ...props( xs ),
            [ theme.breakpoints.up( 'sm' ) ]: {
                ...props( sm ),
            },
            [ theme.breakpoints.up( 'md' ) ]: {
                ...props( md ),
            },
            [ theme.breakpoints.up( 'lg' ) ]: {
                ...props( lg ),
            },
            [ theme.breakpoints.up( 'xl' ) ]: {
                ...props( xl ),
            }
        },
        paperShortClass: {
            overflow: 'hidden',
            alignItems: 'center',
            margin: 0
        },
        paragraphClass: {
            overflow: 'visible',
            margin: 0,
            padding: 0,
            textAlign: 'center',
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
            margin: `${ LETTER_MARGIN }em`,
            width: '1em',
            lineHeight: '1em',
            padding: `${ LETTER_PADDING }em`,
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
