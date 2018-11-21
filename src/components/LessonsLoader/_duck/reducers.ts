import { LessonData } from '../../Lesson/_duck/reducers';

export const INITIAL_STATE: LessonsLoaderState = {
    loading: true,
    error: '',
    lessons: []
};

export interface LessonsLoaderState {
    loading: boolean;
    error: string;
    lessons: LessonData[];
};

export default INITIAL_STATE;