import { createStyles } from '@material-ui/core/styles';
import formStyles from '@appForm/styles';

import {
    MIN_HEIGHT
} from './constants.styles';

const styles = createStyles( theme => {
    return {
        ...formStyles(theme),
        form: {
            [ theme.breakpoints.up('sm') ]: {
                minHeight: MIN_HEIGHT
            }
        }
    };
});

export default styles;