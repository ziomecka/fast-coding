import { createStyles } from '@material-ui/core/styles';

const styles = createStyles({
    standalone: {
        width: '100%',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        '& h1, h2, h3, h4, h5, h6, p': {
            textAlign: 'left',
            margin: `20px 0`
        }
    }
});

export default styles;
