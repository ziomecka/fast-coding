import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as CoursesLoader } from './component';
import { ICoursesLoaderState, onLoadLessons } from './_duck/';

import { ApplicationState } from '@appStore';

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => ( {
    ...state.courses.coursesLoader,
    authorized: state.app.user.authorized
} );

const mapDispatchToProps = ( dispatch: Dispatch ): CoursesLoaderDispatch => ( {
    loadData: () => dispatch( onLoadLessons() )
} );

const CoursesLoaderContainer = connect( mapStateToProps, mapDispatchToProps )( CoursesLoader );

export default CoursesLoaderContainer;

interface MapStateToPropsI extends ICoursesLoaderState {
    authorized: boolean;
}

export interface CoursesLoaderDispatch {
    loadData: () => Action;
}

export interface CoursesLoaderProps extends
    CoursesLoaderDispatch,
    MapStateToPropsI {}
