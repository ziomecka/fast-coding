import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as Notification } from './component';
import { ApplicationState } from '../../store';

import { resetNotification } from './_duck/actions';

import { NotificationState } from './_duck/reducers';

import { ApplicationContainers, AppContainers } from '../../_common/';

import { WithStyles } from '@material-ui/core/styles';

const { app } = ApplicationContainers;
const { notification } = AppContainers;

const mapStateToProps = (state: ApplicationState): NotificationState => ({
    ...state[app][notification]
});

const mapDispatchToProps = (dispatch: Dispatch): NotificationDispatch => ({
    notificationReset: () => dispatch(resetNotification())
});

const NotificationContainer = connect(mapStateToProps, mapDispatchToProps)(Notification);

export default NotificationContainer;

export interface NotificationDispatch {
    notificationReset: () => void,
};

export interface AppNotificationProps extends NotificationDispatch,
    NotificationState,
    WithStyles {};