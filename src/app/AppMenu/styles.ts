import {
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_MAX_LG,
    NAV_HEIGHT_MD,
    NAV_HEIGHT_LG
} from '@constantsStyles';
import { createStyles } from '@material-ui/core/styles';

const style = createStyles(theme => ({
    toolbar: {
        width: 'auto', // without it takes 100% and is over the main title
        padding: 0,
        position: 'fixed',
        right: PAPER_PADDING_MAX_MD,
        height: NAV_HEIGHT_MD,
        [ theme.breakpoints.up('lg') ]: {
            right: PAPER_PADDING_MAX_LG,
            height: NAV_HEIGHT_LG
        }
    }
}));

export default style;