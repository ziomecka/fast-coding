import { connect } from 'react-redux';

import { default as Notification } from './component';
import { ApplicationState } from '@appStore';

import { NotificationState } from './_duck/reducers';

import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';

import { WithStyles } from '@material-ui/core/styles';

const { app } = ApplicationContainersEnum;
const { notification } = AppContainersEnum;

const mapStateToProps = ( state: ApplicationState ): NotificationState => ( {
    ...state[ app ][ notification ]
} );

const NotificationContainer = connect( mapStateToProps )( Notification );

export default NotificationContainer;

export interface AppNotificationProps extends
    NotificationState,
    WithStyles {}
