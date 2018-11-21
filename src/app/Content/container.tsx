import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Content } from './component';
import { ApplicationState } from '../../store';

import { ContentState } from './_duck/reducers';

import { mapDispatchToProps as notificationMapDiaptchToProps, NotificationDispatch } from '../../shared/notification';
import { ApplicationContainers, AppContainers } from '../../_common/';

const { app } = ApplicationContainers;
const { content } = AppContainers;

import { changeLocation } from './_duck/actions';
import { AppLocation } from '../_common/';

const mapStateToProps = (state: ApplicationState): ContentState => ({
    ...state[app][content]
});

const mapDispatchToProps = (dispatch: Dispatch): ContentDispatch => ({
    ...notificationMapDiaptchToProps(dispatch),
    changeLocation: (appLocation: AppLocation) => dispatch(changeLocation(appLocation))
});

/** withRouter is needed here
 *  otherwise Route will not update path
 */
const ContentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Content));

export default ContentContainer;

export interface ContentDispatch extends NotificationDispatch {
    changeLocation: (appLocation: AppLocation) => void;
};

export interface ContentProps extends ContentDispatch, ContentState, RouteComponentProps<{}> {
};