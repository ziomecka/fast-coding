import { LessonData } from '../../Lesson/_duck/reducers';

export const INITIAL_STATE: LessonsLoaderState = {
    loading: true,
    error: '',
    lessons: []
};

export interface LessonsData {
    title: string;
    description: string;
    lessons: LessonData[];
    collection: string;
    type: string;
    _id: string;
    tag: string;
}

export interface LessonsLoaderState {
    loading: boolean;
    error: string;
    lessons: LessonsData[];
};

export default INITIAL_STATE;