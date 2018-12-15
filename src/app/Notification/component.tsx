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
        autoHideDuration,
        variant
    } = props;

    const _icons: { [ key: string ]: React.ComponentType<any> } = {
        [success]: null
    };

    const _classes: { [ key: string ]: { message: string, content: string, icon: string } } = {
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
            <span className={ classes[ variantClasses.message ] }>
                {text}
                {/* Render icon only if truthy */}
                { Icon && <Icon className={`${ classes.notificationIcon } ${ classes[ variantClasses.icon ] }`} /> }
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
                className={ classes[ variantClasses.content ] }
            />
        </SnackBar>
    );
};

export default withStyles(styles)(NotificationComponent);
