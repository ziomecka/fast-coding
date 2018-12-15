import { connect } from 'react-redux';

import { default as Notification } from './component';
import { ApplicationState } from '../../store';

import { NotificationState } from './_duck/reducers';

import { ApplicationContainers, AppContainers } from '../../_common/';

import { WithStyles } from '@material-ui/core/styles';

const { app } = ApplicationContainers;
const { notification } = AppContainers;

const mapStateToProps = (state: ApplicationState): NotificationState => ({
    ...state[app][notification]
});

const NotificationContainer = connect(mapStateToProps)(Notification);

export default NotificationContainer;

export interface AppNotificationProps extends
    NotificationState,
    WithStyles {};