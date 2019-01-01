import { Reducer } from 'redux';

import { LessonData } from '../../Lesson/_duck/reducers';
import { TextTranslationsI } from './types';

export const INITIAL_STATE: LessonsLoaderState = {
    loading: true,
    error: '',
    lessons: []
};

export interface LessonsData {
    title: TextTranslationsI;
    description: TextTranslationsI;
    lessons: LessonData[];
    collection: string;
    type: string;
    _id: string;
    tag: TextTranslationsI;
}

export interface LessonsLoaderState {
    loading: boolean;
    error: string;
    lessons: LessonsData[];
};

const reducer: Reducer<LessonsLoaderState> = (state = INITIAL_STATE) => {
    return { ...state };
};

export { reducer as lessonsLoaderReducer };

export default INITIAL_STATE;