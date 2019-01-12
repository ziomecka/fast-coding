import { createStyles } from '@material-ui/core/styles';

const styles = createStyles( theme => {
    return {
        dialog: {
            lineHeight: '1.3em',
            overflowX: 'hidden',
            '& h1': {
                fontSize: '1.8em',
                margin: '1em 0'
            },
            '& h2, h3': {
                fontSize: '1.5em',
                margin: '1em 0'
            },
            '& h4, h5, h6': {
                fontSize: '1.25rem',
                margin: '1em 0'
            },
            '& h2, h4': {
                fontWeight: 700
            },
            '& p': {
                fontSize: '1.1em',
                margin: '.75em 0',
                textAlign: 'left',
                width: '100%'
            },
            [ theme.breakpoints.only( 'xs' )]: {
                margin: '1rem',
                padding: '1rem'
            },
        },
        dialogContent: {
            [theme.breakpoints.only( 'xs' )]: {
                padding: 0,
            },
            overflowX: 'hidden'
        },
        closeButton: {
            position: 'absolute',
            top: 0,
            right: 0
        }
    };
} );

export default styles;
