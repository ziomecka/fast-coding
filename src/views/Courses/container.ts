import { connect } from 'react-redux';

import { default as CoursesView } from './component';
import { ApplicationState } from '@appStore';
import { WithStyles } from '@material-ui/core';

import { ICoursesLoaderState } from '@courses/CoursesLoader/_duck/';

const mapStateToProps = ( state: ApplicationState ): ICoursesLoaderState => ( {
    ...state.courses.coursesLoader
} );

const CoursesViewContainer = connect( mapStateToProps )( CoursesView );

export default CoursesViewContainer;

export interface CoursesViewProps extends ICoursesLoaderState, WithStyles {}
