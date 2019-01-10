import { combineReducers } from 'redux';
import { ComponentsContainersEnum } from '@componentsTypes';
const { comparator, lesson, textGenerator, lessons, lessonsLoader, lessonButtons } = ComponentsContainersEnum;

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
    TextGeneratorState,
    textGeneratorReducer,
    INITIAL_STATE as TEXT_GENERATOR_INITIAL_STATE
} from '@components/TextGenerator/_duck/reducers';

import {
    LessonsLoaderState,
    lessonsLoaderReducer,
    INITIAL_STATE as LESSONSLOADER_INITIAL_STATE
} from '@components/LessonsLoader/_duck/reducers';

import {
    LessonButtonsState,
    lessonButtonsReducer,
    INITIAL_STATE as LESSONBUTTONS_INITIAL_STATE
} from '@components/Lesson/LessonButtons/_duck/reducers';

import {
    ILessonsState,
    lessonsReducer,
    INITIAL_STATE as LESSONS_INITIAL_STATE
} from '@components/Lessons/_duck/reducers';

export const INITIAL_STATE = {
    [comparator]: { ...COMPARATOR_INITIAL_STATE },
    [lesson]: { ...LESSON_INITIAL_STATE },
    [lessons]: { ...LESSONS_INITIAL_STATE },
    [textGenerator]: { ...TEXT_GENERATOR_INITIAL_STATE },
    [lessonsLoader]: { ...LESSONSLOADER_INITIAL_STATE },
    [lessonButtons]: { ...LESSONBUTTONS_INITIAL_STATE }
};

const reducer = combineReducers( {
    [lesson]: lessonReducer,
    [comparator]: comparatorReducer,
    [textGenerator]: textGeneratorReducer,
    [lessons]: lessonsReducer,
    [lessonButtons]: lessonButtonsReducer,
    [lessonsLoader]: lessonsLoaderReducer
} );

export { reducer as componentsReducer };

export interface ComponentsState {
    [comparator]: ComparatorState;
    [lessons]: ILessonsState;
    [lesson]: LessonState;
    [textGenerator]: TextGeneratorState;
    [lessonsLoader]: LessonsLoaderState;
    [lessonButtons]: LessonButtonsState;
}