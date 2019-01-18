import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Courses } from './component';

import { ApplicationState } from '@appStore';

import { ICoursesState } from './_duck/';

import { ILessonsLoaderState } from '@components/LessonsLoader/';

const mapStateToProps = ( state: ApplicationState ): MapStateToProps => ( {
    ...state.components.lessonsLoader,
    ...state.components.courses
} );

// @ts-ignore
const CoursesContainer = withRouter( connect( mapStateToProps )( Courses ) );

export default CoursesContainer;

interface MapStateToProps extends ILessonsLoaderState, ICoursesState {
}

export interface CoursesProps extends
    ILessonsLoaderState,
    RouteComponentProps<{}>,
    MapStateToProps {}
