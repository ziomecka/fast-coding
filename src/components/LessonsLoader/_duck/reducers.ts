import { LessonData } from '../../Lesson/_duck/reducers';
import { TextTranslationsI } from '@applicationTypes';

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

export default INITIAL_STATE;