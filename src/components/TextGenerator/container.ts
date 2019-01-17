import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as TextGenerator } from './component';
import { ApplicationState } from '@appStore';

import { ITextGeneratorState, onSendText } from './_duck/';
import { LessonState } from '@components/Lesson/_duck/reducers';

const mapStateToProps = ( state: ApplicationState ): ITextGeneratorState & LessonState => ( {
    ...state.components.textGenerator,
    ...state.components.lesson
} );

const mapDispatchToProps = ( dispatch: Dispatch ): TextGeneratorDispatch => ( {
    sendText: ( text ) => dispatch( onSendText( text ) )
} );

const TextGeneratorContainer = connect( mapStateToProps, mapDispatchToProps )( TextGenerator );

export default TextGeneratorContainer;

export interface TextGeneratorDispatch {
    sendText: ( text: string ) => Action;
}

export interface TextGeneratorProps extends TextGeneratorDispatch, ITextGeneratorState, LessonState {}
