import { createStyles } from '@material-ui/core/styles';
import { STEPPER_WIDTH } from './constants.styles';

const styles = createStyles(() => {
    return {
        stepper: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: 0,
            backgroundColor: 'transparent',
            padding: 0,
            width: STEPPER_WIDTH
        }
    };
});

export default styles;