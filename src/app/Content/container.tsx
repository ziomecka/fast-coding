import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Content } from './component';
import { ApplicationState } from '../../store';

import { ContentState } from './_duck/reducers';

import { mapDispatchToProps as notificationMapDiaptchToProps, NotificationDispatch } from '../../shared/notification';
import { ApplicationContainers, AppContainers, ComponentsContainers } from '../../_common/';

const { app, components } = ApplicationContainers;
const { content } = AppContainers;
const { lesson } = ComponentsContainers;

import { changeLocation, changeTitle } from './_duck/actions';
import { AppLocation } from '../_common/';

import { WithStyles } from '@material-ui/core/styles';

import { LocalizeState } from 'react-localize-redux';
import { LessonState } from '../../components/Lesson/_duck/reducers';

interface MapStateToPropsI extends ContentState {
    localize: LocalizeState,
    lessonTitle: string
};

const mapStateToProps = (state: ApplicationState): MapStateToPropsI => ({
    ...state[app][content],
    localize: { ...state.localize },
    lessonTitle: state[components][lesson].title
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
    MapStateToPropsI,
    RouteComponentProps<{}>,
    WithStyles {};