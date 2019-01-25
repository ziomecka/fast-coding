import { createStyles } from '@material-ui/core/styles';

const styles = createStyles( theme => {
    const {
        palette: {
            primary: { main: borderColor }
        }
    } = theme;

    return {
        paperClass: {
            minWidth: 'auto',
            minHeight: 'auto',
            height: 'auto',
            width: '100%',
            position: 'relative',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            padding: '3rem',
            margin: '1rem 0',
            border: `.5px solid ${borderColor}`
        },
        noteClass: {
            '&:after': {
                content: '\':\''
            }
        }
    };
} );

export default styles;
