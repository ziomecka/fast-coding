import green from '@material-ui/core/colors/green';
import { COLOR_SUCCESS } from '../../constants';

const styles = theme => ({
    notificationMessage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    notificationIcon: {
        fontSize: 30,
        // opacity: 0.9,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    notificationMessageSmile: {
        color: theme.palette.text.primary,
        backgroundColor: COLOR_SUCCESS,
    },
    notificationContentSmile: {
        backgroundColor: COLOR_SUCCESS,
    },
    notificationIconSmile: {
        color: theme.palette.text.primary
    }
});

export default styles;