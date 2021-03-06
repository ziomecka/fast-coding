import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as LessonTextGenerator } from './component';
import { ApplicationState } from '@appStore';

import { ILessonTextGeneratorState, onSendText } from './_duck/';
import { ILessonComponentState } from '@lesson/LessonComponent/';

const mapStateToProps = ( state: ApplicationState ): ILessonTextGeneratorState & ILessonComponentState => ( {
    ...state.lesson.lessonTextGenerator,
    ...state.lesson.lessonComponent
} );

const mapDispatchToProps = ( dispatch: Dispatch ): LessonTextGeneratorDispatch => ( {
    sendText: ( text ) => dispatch( onSendText( text ) )
} );

const LessonTextGeneratorContainer = connect( mapStateToProps, mapDispatchToProps )( LessonTextGenerator );

export default LessonTextGeneratorContainer;

export interface LessonTextGeneratorDispatch {
    sendText: ( text: string ) => Action;
}

export interface LessonTextGeneratorProps extends LessonTextGeneratorDispatch, ILessonTextGeneratorState, ILessonComponentState {}
