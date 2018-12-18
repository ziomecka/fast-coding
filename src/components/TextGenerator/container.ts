import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as TextGenerator } from './component';
import { ApplicationState } from '../../store';

import { TextGeneratorState } from './_duck/reducers';
import { LessonState } from '../Lesson/_duck/reducers';

import { ApplicationContainersEnum, ComponentsContainersEnum } from '@applicationTypes';;

import { onSendText } from './_duck/operations';

const { components } = ApplicationContainersEnum;
const { lesson, textGenerator } = ComponentsContainersEnum;

const mapStateToProps = (state: ApplicationState): TextGeneratorState & LessonState => ({
    ...state[components][textGenerator],
    ...state[components][lesson]
});

const mapDispatchToProps = (dispatch: Dispatch): TextGeneratorDispatch => ({
    sendText: (text) => dispatch(onSendText(text))
});

const TextGeneratorContainer = connect(mapStateToProps, mapDispatchToProps)(TextGenerator);

export default TextGeneratorContainer;

export interface TextGeneratorDispatch {
    sendText: (text: string) => void;
};

export interface TextGeneratorProps extends TextGeneratorDispatch, TextGeneratorState, LessonState {};