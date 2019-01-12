import * as React from 'react';

import { AppNotificationProps } from './container';

import { NotificationVariantEnum } from './_duck/types';
const { success, error } = NotificationVariantEnum;

/** Materials */
import SnackBar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide from '@material-ui/core/Slide';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const NotificationComponent: React.StatelessComponent<AppNotificationProps> = props => {
    let {
        open,
        text,
        classes,
        classes: { notificationMessage, notificationContent, notificationIcon },
        autoHideDuration,
        variant
    } = props;

    const _icons: { [ key: string ]: React.ComponentType<any> } = {
        [ success ]: null,
        [ error ]: null
    };

    const _classes: { [ key: string ]: { message: string, content: string, icon: string } } = {
        [ success ]: {
            message: 'notificationMessageSuccess',
            content: 'notificationContentSuccess',
            icon: 'notificationIconSuccess'
        },
        [ error ]: {
            message: 'notificationMessageError',
            content: 'notificationContentError',
            icon: 'notificationIconError'
        }
    };

    const variantClasses = _classes[ variant ];
    const Icon = _icons[ variant ];

    const message = (
        <React.Fragment>
            <span className={ `${ notificationMessage } ${classes[ variantClasses.message ]}` }>
                {text}
                {/* Render icon only if truthy */}
                { Icon && <Icon className={`${ notificationIcon } ${ classes[ variantClasses.icon ] }`} /> }
            </span>
        </React.Fragment>
    );

    return (
        <SnackBar
            {...{ open, autoHideDuration }}
            TransitionComponent={Slide}
        >
            <SnackbarContent
                {...{ message }}
                aria-describedby="client-snackbar"
                className={ `${ notificationContent } ${classes[ variantClasses.content ]}` }
            />
        </SnackBar>
    );
};

export default withStyles( styles )( NotificationComponent );
