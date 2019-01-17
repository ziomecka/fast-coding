import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { WithStyles, WithTheme } from '@material-ui/core/styles';

import { default as Course } from './component';

import { LessonData } from '@components/Lesson/_duck/reducers';

import { onOpenRandomLesson, onOpenLesson } from './_duck/';

import { ApplicationState } from '@appStore';

import { LessonsDataI } from '@componentsTypes';

import { LocalizeState } from 'react-localize-redux';
import { openCourse, OpenCourseAction } from '@components/Lessons/_duck/actions';
import { onCloseCourse } from '@components/Lessons/_duck/operations';

import { IWithMedia } from '@app/Media/';

const mapStateToProps = ( state: ApplicationState ): MapStateToProps => ( {
    localize: state.localize,
    openedCourseId: state.components.lessons.openedCourseId
} );

const mapDispatchToProps = ( dispatch: Dispatch ): CourseDispatch => ( {
    handleOpenLesson: ( lessonData ) => dispatch( onOpenLesson( lessonData ) ),
    handleOpenRandomLesson: ( lessonData ) => dispatch( onOpenRandomLesson( lessonData ) ),
    openCourse: ( courseId ) => dispatch( openCourse( courseId ) ),
    closeCourse: ( courseId ) => dispatch( onCloseCourse( courseId ) )
} );

// @ts-ignore
const CourseContainer = withRouter( connect( mapStateToProps, mapDispatchToProps )( Course ) );

export default CourseContainer;

interface MapStateToProps {
    localize: LocalizeState;
    openedCourseId: string;
}

export interface CourseDispatch {
    handleOpenLesson: ( lessonData: LessonData ) => Action;
    handleOpenRandomLesson: ( lessonData: LessonData ) => Action;
    openCourse: ( courseId: string ) => OpenCourseAction;
    closeCourse: ( courseId: string ) => Action;
}

export interface CourseProps extends
CourseDispatch,
RouteComponentProps<{}>,
WithStyles,
WithTheme,
LessonsDataI,
IWithMedia,
MapStateToProps {
}
