import { createStyles } from '@material-ui/core/styles';

const styles = createStyles( theme => {
    return {
        buttonClass: {
            margin: '1em',
            flexDirection: 'column',
            '&:after': {
                display: 'block',
                content: 'attr(aftertext)',
                width: '100%',
                textTransform: 'lowercase',
                fontSize: '.9em'
            }
        }
    };
} );

export default styles;
