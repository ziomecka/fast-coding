import { createStyles } from '@material-ui/core/styles';
import {
    PAPER_PADDING_MAX_XS,
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_MAX_LG
} from '@constantsStyles';

import { NOTIFICATION_FONTSIZE } from './constants.styles';

const styles = createStyles( theme => {
    const {
        spacing: { unit },
        palette: {
            primary: { dark: successBackground, contrastText: successText },
            secondary: { dark: errorBackground, contrastText: errorText }
        },
        typography: { lineHeight }
    } = theme;

    return {
        notificationMessage: {
            fontSize: NOTIFICATION_FONTSIZE,
            textAlign: 'center',
            lineHeight
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
            padding: PAPER_PADDING_MAX_XS,
            [ theme.breakpoints.up( 'sm' ) ]: {
                padding: PAPER_PADDING_MAX_MD
            },
            [ theme.breakpoints.up( 'lg' ) ]: {
                padding: PAPER_PADDING_MAX_LG
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
} );

export default styles;
