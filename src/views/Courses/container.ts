import { connect } from 'react-redux';

import { default as LessonsView } from './component';
import { ApplicationState } from '@appStore';
import { WithStyles } from '@material-ui/core';

import { ILessonsLoaderState } from '@components/LessonsLoader/_duck/';

const mapStateToProps = ( state: ApplicationState ): ILessonsLoaderState => ( {
    ...state.components.lessonsLoader
} );

const LessonsViewContainer = connect( mapStateToProps )( LessonsView );

export default LessonsViewContainer;

export interface LessonsViewProps extends ILessonsLoaderState, WithStyles {}
