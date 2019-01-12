import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as TextGenerator } from './component';
import { ApplicationState } from '@appStore';

import { TextGeneratorState } from './_duck/reducers';
import { LessonState } from '@components/Lesson/_duck/reducers';

import { ApplicationContainersEnum } from '@applicationTypes';
import { ComponentsContainersEnum } from '@componentsTypes';

import { onSendText } from './_duck/operations';

const { components } = ApplicationContainersEnum;
const { lesson, textGenerator } = ComponentsContainersEnum;

const mapStateToProps = ( state: ApplicationState ): TextGeneratorState & LessonState => ( {
    ...state[ components ][ textGenerator ],
    ...state[ components ][ lesson ]
} );

const mapDispatchToProps = ( dispatch: Dispatch ): TextGeneratorDispatch => ( {
    sendText: ( text ) => dispatch( onSendText( text ) )
} );

const TextGeneratorContainer = connect( mapStateToProps, mapDispatchToProps )( TextGenerator );

export default TextGeneratorContainer;

export interface TextGeneratorDispatch {
    sendText: ( text: string ) => Action;
}

export interface TextGeneratorProps extends TextGeneratorDispatch, TextGeneratorState, LessonState {}
