import * as React from 'react';

import { AppNotificationProps } from './container';

import * as constants from '../../constants';

const { NOTIFICATION_DURATION } = constants;

/** Materials */
import SnackBar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide from '@material-ui/core/Slide';
import Mood from '@material-ui/icons/Mood';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const NotificationComponent: React.StatelessComponent<AppNotificationProps> = props => {
    let {
        open = false,
        text,
        classes
    } = props;

    const variant = "smile";

    const autoHideDuration = NOTIFICATION_DURATION;

    const _icons = {
        smile: Mood
    };

    const _classes = {
        smile: {
            message: 'notificationMessageSmile',
            content: 'notificationContentSmile',
            icon: 'notificationIconSmile'
        }
    };

    const Icon = _icons[variant];
    const _text = text;

    const message = (
        <>
            <span className={`${classes.notificationMessage} ${classes[_classes[variant].message]}`}>
                {_text}
                <Icon className={`${classes.notificationIcon} ${classes[_classes[variant].icon]}`} />
            </span>
        </>
    );

    return (
        <SnackBar
            {...{ open, autoHideDuration }}
            TransitionComponent={Slide}
        >
            <SnackbarContent
                {...{ message }}
                aria-describedby="client-snackbar"
                className={classes[_classes[variant].content]}
            />
        </SnackBar>
    );
};

export default withStyles(styles)(NotificationComponent);
