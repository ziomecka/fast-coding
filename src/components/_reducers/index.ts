import { combineReducers } from 'redux';

import {
    ComparatorState,
    comparatorReducer,
    INITIAL_STATE as COMPARATOR_INITIAL_STATE
} from '@components/Lesson/Comparator/_duck/reducers';

import {
    LessonState,
    lessonReducer,
    INITIAL_STATE as LESSON_INITIAL_STATE
} from '@components/Lesson/_duck/reducers';

import {
    ITextGeneratorState,
    textGeneratorReducer,
    INITIAL_STATE as TEXT_GENERATOR_INITIAL_STATE
} from '@components/TextGenerator/_duck/';

import {
    ILessonsLoaderState,
    lessonsLoaderReducer,
    INITIAL_STATE as LESSONSLOADER_INITIAL_STATE
} from '@components/LessonsLoader/_duck/';

import {
    LessonButtonsState,
    lessonButtonsReducer,
    INITIAL_STATE as LESSONBUTTONS_INITIAL_STATE
} from '@components/Lesson/LessonButtons/_duck/reducers';

import {
    ILessonsState,
    lessonsReducer,
    INITIAL_STATE as LESSONS_INITIAL_STATE
} from '@components/Lessons/';

export const INITIAL_STATE = {
    comparator: { ...COMPARATOR_INITIAL_STATE },
    lesson: { ...LESSON_INITIAL_STATE },
    lessons: { ...LESSONS_INITIAL_STATE },
    textGenerator: { ...TEXT_GENERATOR_INITIAL_STATE },
    lessonsLoader: { ...LESSONSLOADER_INITIAL_STATE },
    lessonButtons: { ...LESSONBUTTONS_INITIAL_STATE }
};

const reducer = combineReducers( {
    lesson: lessonReducer,
    comparator: comparatorReducer,
    textGenerator: textGeneratorReducer,
    lessons: lessonsReducer,
    lessonButtons: lessonButtonsReducer,
    lessonsLoader: lessonsLoaderReducer
} );

export { reducer as componentsReducer };

export interface ComponentsState {
    comparator: ComparatorState;
    lessons: ILessonsState;
    lesson: LessonState;
    textGenerator: ITextGeneratorState;
    lessonsLoader: ILessonsLoaderState;
    lessonButtons: LessonButtonsState;
}
