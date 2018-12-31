import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { WithStyles } from '@material-ui/core/styles';

import { default as Course } from './component';

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
    localize: state.localize
});

const mapDispatchToProps = (dispatch: Dispatch): CourseDispatch => ({
    handleOpenLesson: (lessonData) => dispatch(onOpenLesson(lessonData)),
    handleOpenRandomLesson: (lessonData) => dispatch(onOpenRandomLesson(lessonData))
});

// @ts-ignore
const CourseContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Course));

export default CourseContainer;

interface MapStateToProps {
    localize: LocalizeState
}

export interface CourseDispatch {
    handleOpenLesson: (lessonData: LessonData) => Action;
    handleOpenRandomLesson: (lessonData: LessonData) => Action;
};

export interface CourseProps extends
    CourseDispatch,
    LessonsLoaderState,
    RouteComponentProps<{}>,
    WithStyles,
    MapStateToProps {
        lessons,
        title: string;
        description: string;
    };