import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { WithStyles } from '@material-ui/core/styles';

import { default as Lessons } from './component';

import { LessonData } from '../Lesson/_duck/reducers';

import { onOpenRandomLesson, onOpenLesson } from './_duck/operations';
import { ApplicationContainersEnum } from '@applicationTypes';
import { ComponentsContainersEnum } from '@componentsTypes';

import { ApplicationState } from '../../_reducers/';

import { LessonsLoaderState } from '../LessonsLoader/_duck/reducers';

import { LocalizeState} from 'react-localize-redux';

const { components } = ApplicationContainersEnum;
const { lessonsLoader } = ComponentsContainersEnum;

const mapStateToProps = (state: ApplicationState): MapStateToProps => ({
    ...state[components][lessonsLoader],
    localize: state.localize
});

const mapDispatchToProps = (dispatch: Dispatch): LessonsDispatch => ({
    handleOpenLesson: (lessonData) => dispatch(onOpenLesson(lessonData)),
    handleOpenRandomLesson: (lessonData) => dispatch(onOpenRandomLesson(lessonData))
});

const LessonsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Lessons));

export default LessonsContainer;

interface MapStateToProps extends LessonsLoaderState {
    localize: LocalizeState
}

export interface LessonsDispatch {
    handleOpenLesson: (lessonData: LessonData) => Action;
    handleOpenRandomLesson: (lessonData: LessonData) => Action;
};

export interface LessonsProps extends
    LessonsDispatch,
    LessonsLoaderState,
    RouteComponentProps<{}>,
    WithStyles,
    MapStateToProps {};