import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as Notification } from './component';
import { ApplicationState } from '../../store';

import { closeNotification } from './_duck/actions';

import { NotificationState } from './_duck/reducers';
import { default as operations } from './_duck/';

import { ApplicationContainers, AppContainers } from '../../_common/';

import { WithStyles } from '@material-ui/core';

const { app } = ApplicationContainers;
const { notification } = AppContainers;

const { onOpenNotification } = operations;

const mapStateToProps = (state: ApplicationState): NotificationState => ({
    ...state[app][notification]
});

const mapDispatchToProps = (dispatch: Dispatch): NotificationDispatch => ({
    notificationOpen: (text: string, timeout: number) => dispatch(onOpenNotification(text, timeout)),
    notificationClose: () => dispatch(closeNotification())
});

const NotificationContainer = connect(mapStateToProps, mapDispatchToProps)(Notification);

export default NotificationContainer;

export interface NotificationDispatch {
    notificationOpen: (text: string, timeout: number) => void,
    notificationClose: () => void
};

export interface AppNotificationProps extends NotificationDispatch,
    NotificationState,
    WithStyles {};