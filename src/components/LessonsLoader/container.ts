import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as LessonsLoader } from './component';
import { ILessonsLoaderState, onLoadLessons } from './_duck/';

import { ApplicationState } from '@appStore';

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => ( {
    ...state.components.lessonsLoader,
    authorized: state.app.user.authorized
} );

const mapDispatchToProps = ( dispatch: Dispatch ): LessonsLoaderDispatch => ( {
    loadData: () => dispatch( onLoadLessons() )
} );

const LessonsLoaderContainer = connect( mapStateToProps, mapDispatchToProps )( LessonsLoader );

export default LessonsLoaderContainer;

interface MapStateToPropsI extends ILessonsLoaderState {
    authorized: boolean;
}

export interface LessonsLoaderDispatch {
    loadData: () => Action;
}

export interface LessonsLoaderProps extends
    LessonsLoaderDispatch,
    MapStateToPropsI {}
