import { connect } from 'react-redux';

import { default as OriginalTextArea } from './component';
import { ApplicationState } from '@appStore';

import { ComparatorState } from '@components/Comparator/';
import { LessonState } from '@components/Lesson/';

import { WithStyles } from '@material-ui/core/styles';

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => ( {
    ...state.components.comparator,
    ...state.components.lesson
} );

const OriginalTextAreaContainer = connect( mapStateToProps )( OriginalTextArea );

export default OriginalTextAreaContainer;

interface MapStateToPropsI extends ComparatorState, LessonState {}

export interface OriginalTextAreaProps extends
    MapStateToPropsI,
    WithStyles {}
