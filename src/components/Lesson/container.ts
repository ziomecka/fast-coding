import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Lesson } from './component';
import { ApplicationState } from '../../store';

import { LessonState } from './_duck/reducers';

import { mapDispatchToProps as notificationMapDiaptchToProps, NotificationDispatch } from '../../shared/notification';
import { ApplicationContainers, ComponentsContainers } from '../../_common/';

const { components } = ApplicationContainers;
const { lesson, comparator } = ComponentsContainers;

import { turnOnTextGenerator } from '../TextGenerator/_duck/actions';

const mapStateToProps = (state: ApplicationState): LessonState => ({
    ...state[components][lesson],
    currentSignIndex: state[components][comparator].currentSignIndex

});

const mapDispatchToProps = (dispatch: Dispatch): LessonDispatch => ({
    ...notificationMapDiaptchToProps(dispatch),
    turnOnTextGenerator: () => dispatch(turnOnTextGenerator())
});

const LessonContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Lesson));

export default LessonContainer;

export interface LessonDispatch extends NotificationDispatch {
    turnOnTextGenerator: () => void
};

export interface LessonProps extends LessonDispatch, LessonState, RouteComponentProps<{}> {
    currentSignIndex: number;
};