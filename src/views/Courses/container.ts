import { connect } from 'react-redux';

import { default as LessonsView } from './component';
import { ApplicationState } from '@appStore';
import { WithStyles } from '@material-ui/core';

import { ICoursesLoaderState } from '@components/CoursesLoader/_duck/';

const mapStateToProps = ( state: ApplicationState ): ICoursesLoaderState => ( {
    ...state.components.coursesLoader
} );

const LessonsViewContainer = connect( mapStateToProps )( LessonsView );

export default LessonsViewContainer;

export interface LessonsViewProps extends ICoursesLoaderState, WithStyles {}
