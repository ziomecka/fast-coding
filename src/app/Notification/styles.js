import { COLOR_SUCCESS } from '../../constants';

const styles = theme => {
    const {
        spacing: { unit },
        palette: {
            text: { primary: textPrimary },
            grey: { 100: successBackground }
        }
    } = theme;

    return {
        notificationIcon: {
            fontSize: 30,
            // opacity: 0.9,
            marginLeft: unit,
            marginRight: unit
        },
        notificationMessageSuccess: {
            color: textPrimary,
            backgroundColor: COLOR_SUCCESS,
        },
        notificationContentSuccess: {
            backgroundColor: COLOR_SUCCESS,
        },
        notificationIconSuccess: {
            color: textPrimary
        }
    };
};

export default styles;