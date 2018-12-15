import * as React from 'react';

import { AppNotificationProps } from './container';

import { NotificationVariantEnum } from './_duck/types';
const { success } = NotificationVariantEnum;

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
        classes,
        notificationReset,
        autoHideDuration,
        variant
    } = props;

    const _icons = {
        [success]: Mood
    };

    const _classes = {
        [success]: {
            message: 'notificationMessageSuccess',
            content: 'notificationContentSuccess',
            icon: 'notificationIconSuccess'
        }
    };

    const variantClasses = _classes[variant];
    const Icon = _icons[variant];

    const message = (
        <>
            <span className={ classes[variantClasses.message] }>
                {text}
                {/* Render icon only if truthy */}
                { Icon && <Icon className={`${classes.notificationIcon} ${classes[variantClasses.icon]}`} /> }
            </span>
        </>
    );

    return (
        <SnackBar
            {...{ open, autoHideDuration }}
            TransitionComponent={Slide}
            onExited={notificationReset}
        >
            <SnackbarContent
                {...{ message }}
                aria-describedby="client-snackbar"
                className={classes[variantClasses.content]}
            />
        </SnackBar>
    );
};

export default withStyles(styles)(NotificationComponent);
