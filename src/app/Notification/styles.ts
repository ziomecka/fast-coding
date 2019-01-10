import { createStyles } from '@material-ui/core/styles';
import { PAPER_PADDING_MD, PAPER_PADDING_LG } from '@constantsStyles';

import { NOTIFICATION_FONTSIZE } from './constants.styles';

const styles = createStyles(theme => {
    const {
        spacing: { unit },
        palette: {
            primary: { dark: successBackground, contrastText: successText },
            secondary: { dark: errorBackground, contrastText: errorText }
        }
    } = theme;

    return {
        notificationMessage: {
            fontSize: NOTIFICATION_FONTSIZE
        },
        notificationMessageSuccess: {
            color: successText,
            backgroundColor: successBackground,
        },
        notificationMessageError: {
            color: errorText,
            backgroundColor: errorBackground
        },
        notificationContent: {
            padding: PAPER_PADDING_MD,
            [theme.breakpoints.up('sm')] :{
                padding: PAPER_PADDING_LG
            }
        },
        notificationContentSuccess: {
            backgroundColor: successBackground,
        },
        notificationContentError: {
            backgroundColor: errorBackground
        },
        notificationIcon: {
            marginLeft: unit,
            marginRight: unit
        },
        notificationIconSuccess: {
            color: successText
        },
        notificationIconError: {
            color: errorText
        }
    };
});

export default styles;