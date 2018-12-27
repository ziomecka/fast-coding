import { createStyles } from '@material-ui/core/styles';
import { FC_FORM_WIDTH } from './constants';

const styles = createStyles(theme => {
    return {
        FCForm: {
            minWidth: FC_FORM_WIDTH,
            '& div': {
                width: '100%'
            }
        },
        FCFormButton: {
            width: '100%'
        }
    };
});

export default styles;