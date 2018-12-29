import { PAPER_PADDING_MAX_MD } from '@constantsStyles';
import { createStyles } from '@material-ui/core/styles';

const style = createStyles(theme => ({
    toolbar: {
        width: 'auto', // without it takes 100% and is over the main title
        padding: 0,
        position: 'fixed',
        top: PAPER_PADDING_MAX_MD,
        right: PAPER_PADDING_MAX_MD,
        [ theme.breakpoints.up('md') ]: {
            position: 'static',
            top: 'auto',
            right: 'auto'
        }
    }
}));

export default style;