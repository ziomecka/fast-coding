import createStyles from '@material-ui/core/styles/createStyles';

const styles = createStyles( {
    /** Make it look like standard text */
    button: {
        padding: 0,
        fontSize: '1em',
        letterSpacing: 0,
        justifyContent: 'flex-start',
        textAlign: 'inherit',
        textDecoration: 'underline',
        textDirection: 'inherit'
    }
} );

export default styles;