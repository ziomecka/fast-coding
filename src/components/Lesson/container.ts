import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Lesson } from './component';
import { ApplicationState } from '../../store';

import { LessonState } from './_duck/reducers';

import { mapDispatchToProps as notificationMapDiaptchToProps, NotificationDispatch } from '../../shared/notification';
import { ApplicationContainers, ComponentsContainers } from '../../_common/';

const { components } = ApplicationContainers;
const { lesson } = ComponentsContainers;

import { onReset } from './_duck/operations';

const mapStateToProps = (state: ApplicationState): LessonState => ({
    ...state[components][lesson]
});

const mapDispatchToProps = (dispatch: Dispatch): LessonDispatch => ({
    ...notificationMapDiaptchToProps(dispatch),
    reset: () => dispatch(onReset())
});

const LessonContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Lesson));

export default LessonContainer;

export interface LessonDispatch extends NotificationDispatch {
    reset: () => void;
};

export interface LessonProps extends LessonDispatch, LessonState, RouteComponentProps<{}> {}