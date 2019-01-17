import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Lessons } from './component';

import { ApplicationState } from '@appStore';

import { ILessonsState } from './_duck/reducers';

import { ILessonsLoaderState } from '@components/LessonsLoader/_duck/';

const mapStateToProps = ( state: ApplicationState ): MapStateToProps => ( {
    ...state.components.lessonsLoader,
    ...state.components.lessons
} );

// @ts-ignore
const LessonsContainer = withRouter( connect( mapStateToProps )( Lessons ) );

export default LessonsContainer;

interface MapStateToProps extends ILessonsLoaderState, ILessonsState {
}

export interface LessonsProps extends
    ILessonsLoaderState,
    RouteComponentProps<{}>,
    MapStateToProps {}
