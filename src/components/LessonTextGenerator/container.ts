import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as LessonTextGenerator } from './component';
import { ApplicationState } from '@appStore';

import { ILessonTextGeneratorState, onSendText } from './_duck/';
import { LessonState } from '@components/Lesson/';

const mapStateToProps = ( state: ApplicationState ): ILessonTextGeneratorState & LessonState => ( {
    ...state.components.lessonTextGenerator,
    ...state.components.lesson
} );

const mapDispatchToProps = ( dispatch: Dispatch ): LessonTextGeneratorDispatch => ( {
    sendText: ( text ) => dispatch( onSendText( text ) )
} );

const LessonTextGeneratorContainer = connect( mapStateToProps, mapDispatchToProps )( LessonTextGenerator );

export default LessonTextGeneratorContainer;

export interface LessonTextGeneratorDispatch {
    sendText: ( text: string ) => Action;
}

export interface LessonTextGeneratorProps extends LessonTextGeneratorDispatch, ILessonTextGeneratorState, LessonState {}
