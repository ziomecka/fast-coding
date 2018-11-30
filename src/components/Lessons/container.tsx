import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { WithStyles } from '@material-ui/core/styles';

import { default as Lessons } from './component';

import { LessonData } from '../Lesson/_duck/reducers';
import { openLesson } from '../Lesson/_duck/actions';

import { onOpenRandomLesson } from './_duck/operations';
import { ApplicationContainers, ComponentsContainers } from '../../_common/';
import ApplicationState from '../../_reducers/';

import { LessonsLoaderState } from '../LessonsLoader/_duck/reducers';

const { components } = ApplicationContainers;
const { lessonsLoader } = ComponentsContainers;

const mapStateToProps = (state: ApplicationState): LessonsLoaderState => ({
    ...state[components][lessonsLoader]
});

const mapDispatchToProps = (dispatch: Dispatch): LessonsDispatch => ({
    handleOpenLesson: (lessonData) => dispatch(openLesson(lessonData)),
    handleOpenRandomLesson: (lessonData) => dispatch(onOpenRandomLesson(lessonData))
});

const LessonsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Lessons));

export default LessonsContainer;

export interface LessonsDispatch {
    handleOpenLesson: (lessonData: LessonData) => void;
    handleOpenRandomLesson: (lessonData: LessonData) => void;
};

export interface LessonsProps extends LessonsDispatch, LessonsLoaderState, RouteComponentProps<{}>, WithStyles {
};