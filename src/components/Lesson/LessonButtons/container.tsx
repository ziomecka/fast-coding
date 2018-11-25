import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as LessonButtons } from './component';
import { ApplicationState } from '../../../store';

import { LessonState } from '../_duck/reducers';
import { LessonButtonsState } from './_duck/reducers';

import { ComponentsContainers, ApplicationContainers } from '../../../_common/';
import { DialogDispatch, mapDispatchToProps as dialogMapsDispatchToProps } from '../../../shared/dialog';

import { onRestartLesson } from './_duck/operations';
import { onReset } from '../_duck/operations';

const { components } = ApplicationContainers;
const { lesson, lessonButtons } = ComponentsContainers;

import { WithStyles } from '@material-ui/core';

import {
    turnOnDraggableLessonButtons,
    turnOffDraggableLessonButtons,
    resetDraggableLessonButtons
} from './_duck/actions';

const mapDispatchToProps = (dispatch: Dispatch): LessonButtonsDispatch => ({
    ...dialogMapsDispatchToProps(dispatch),
    restartLesson: () => dispatch(onRestartLesson()),
    resetLesson: () => dispatch(onReset()),
    turnOnDraggable: () => dispatch(turnOnDraggableLessonButtons()),
    turnOffDraggable: () => dispatch(turnOffDraggableLessonButtons()),
    resetLessonButtons: () => dispatch(resetDraggableLessonButtons())
})

const mapStateToProps = (state: ApplicationState): LessonState & LessonButtonsState => ({
    ...state[components][lesson],
    ...state[components][lessonButtons]
});

const LessonButtonsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonButtons));

export default LessonButtonsContainer;

export interface LessonButtonsDispatch extends DialogDispatch {
    restartLesson: () => void;
    resetLesson: () => void;
    turnOnDraggable: () => void;
    turnOffDraggable: () => void;
    resetLessonButtons: () => void;
};

export interface LessonButtonsProps extends
    LessonState,
    LessonButtonsState,
    LessonButtonsDispatch,
    RouteComponentProps<{}>,
    WithStyles {};