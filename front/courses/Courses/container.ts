import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Courses } from './component';

import { ApplicationState } from '@appStore';

import { ICoursesState } from './_duck/';

import { ICoursesLoaderState } from '@courses/CoursesLoader/';

const mapStateToProps = ( state: ApplicationState ): MapStateToProps => ( {
    ...state.courses.coursesLoader,
    ...state.courses.courses
} );

// @ts-ignore
const CoursesContainer = withRouter( connect( mapStateToProps )( Courses ) );

export default CoursesContainer;

interface MapStateToProps extends ICoursesLoaderState, ICoursesState {
}

export interface CoursesProps extends
    ICoursesLoaderState,
    RouteComponentProps<{}>,
    MapStateToProps {}
