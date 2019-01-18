import { connect } from 'react-redux';

import { default as LessonText } from './component';
import { ApplicationState } from '@appStore';

import { LessonComparatorState } from '@components/LessonComparator/';
import { LessonState } from '@components/Lesson/';

import { WithStyles } from '@material-ui/core/styles';

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => ( {
    ...state.components.lessonComparator,
    ...state.components.lesson
} );

const LessonTextContainer = connect( mapStateToProps )( LessonText );

export default LessonTextContainer;

interface MapStateToPropsI extends LessonComparatorState, LessonState {}

export interface LessonTextProps extends
    MapStateToPropsI,
    WithStyles {}
