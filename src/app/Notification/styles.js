import { PAPER_PADDING, NOTIFICATION_FONTSIZE } from '../../constants';

const styles = theme => {
    const {
        spacing: { unit },
        palette: {
            primary: { dark: successBackground, contrastText: successText }
        }
    } = theme;

    return {
        notificationIcon: {
            fontSize: NOTIFICATION_FONTSIZE,
            marginLeft: unit,
            marginRight: unit
        },
        notificationMessageSuccess: {
            fontSize: NOTIFICATION_FONTSIZE,
            color: successText,
            backgroundColor: successBackground,
        },
        notificationContentSuccess: {
            padding: PAPER_PADDING,
            backgroundColor: successBackground,
        },
        notificationIconSuccess: {
            color: successText
        }
    };
};

export default styles;