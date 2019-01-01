import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { WithStyles } from '@material-ui/core/styles';

import { default as Course } from './component';

import { LessonData } from '../Lesson/_duck/reducers';

import { onOpenRandomLesson, onOpenLesson } from './_duck/operations';

import { ApplicationState } from '../../_reducers/';

import { LessonsDataI } from '@componentsTypes';

import { LocalizeState } from 'react-localize-redux';
import { openCourse, OpenCourseAction } from '../Lessons/_duck/actions';
import { onCloseCourse } from '../Lessons/_duck/operations';

import { ApplicationContainersEnum } from '@applicationTypes';
import { ComponentsContainersEnum } from '@componentsTypes';
const { components } = ApplicationContainersEnum;
const { lessons } = ComponentsContainersEnum;

const mapStateToProps = (state: ApplicationState): MapStateToProps => ({
    localize: state.localize,
    openedCourseId: state[components][lessons].openedCourseId
});

const mapDispatchToProps = (dispatch: Dispatch): CourseDispatch => ({
    handleOpenLesson: (lessonData) => dispatch(onOpenLesson(lessonData)),
    handleOpenRandomLesson: (lessonData) => dispatch(onOpenRandomLesson(lessonData)),
    openCourse: (courseId) => dispatch(openCourse(courseId)),
    closeCourse: (courseId) => dispatch(onCloseCourse(courseId))
});

// @ts-ignore
const CourseContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Course));

export default CourseContainer;

interface MapStateToProps {
    localize: LocalizeState;
    openedCourseId: string;
}

export interface CourseDispatch {
    handleOpenLesson: (lessonData: LessonData) => Action;
    handleOpenRandomLesson: (lessonData: LessonData) => Action;
    openCourse: (courseId: string) => OpenCourseAction;
    closeCourse: (courseId: string) => Action;
};

export interface CourseProps extends
CourseDispatch,
RouteComponentProps<{}>,
WithStyles,
LessonsDataI,
MapStateToProps {
};