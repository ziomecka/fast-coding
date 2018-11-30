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

import { changeLocation, changeTitle } from './_duck/actions';
import { AppLocation } from '../_common/';

import { WithStyles } from '@material-ui/core/styles';

import { LocalizeState } from 'react-localize-redux';

interface ExtendedContentState extends ContentState {
    localize: LocalizeState
};

const mapStateToProps = (state: ApplicationState): ExtendedContentState => ({
    ...state[app][content],
    localize: { ...state.localize }
});

const mapDispatchToProps = (dispatch: Dispatch): ContentDispatch => ({
    ...notificationMapDiaptchToProps(dispatch),
    changeLocation: (appLocation: AppLocation) => dispatch(changeLocation(appLocation)),
    changeTitle: (title) => dispatch(changeTitle(title))
});

// @ts-ignore
const ContentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Content));

export default ContentContainer;

export interface ContentDispatch extends NotificationDispatch {
    changeLocation: (appLocation: AppLocation) => void;
    changeTitle: (title: string) => void;
};

export interface ContentProps extends ContentDispatch,
    ExtendedContentState,
    RouteComponentProps<{}>,
    WithStyles {};