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
            padding: PAPER_PADDING_MD,
            [theme.breakpoints.up('md')] :{
                padding: PAPER_PADDING_LG
            },
            backgroundColor: successBackground,
        },
        notificationIconSuccess: {
            color: successText
        },
        notificationMessageError: {
            fontSize: NOTIFICATION_FONTSIZE,
            color: errorText,
            backgroundColor: errorBackground
        },
        notificationContentError: {
            padding: PAPER_PADDING_MD,
            [theme.breakpoints.up('md')] :{
                padding: PAPER_PADDING_LG
            },
            backgroundColor: errorBackground
        },
        notificationIconError: {
            color: errorText
        }
    };
});

export default styles;