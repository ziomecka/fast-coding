import { Reducer } from 'redux';
import { ComponentsActions } from '../_actions/';
import { ComponentsContainers, ComparatorContainers } from '../_common/';

const { comparator, lesson, textGenerator, lessons, lessonsLoader, lessonButtons } = ComponentsContainers;
const { stats } = ComparatorContainers;

import {
    ComparatorState,
    comparatorReducer,
    INITIAL_STATE as COMPARATOR_INITIAL_STATE
} from '../Lesson/Comparator/_duck/reducers';

import {
    LessonState,
    lessonReducer,
    INITIAL_STATE as LESSON_INITIAL_STATE
} from '../Lesson/_duck/reducers';

import {
    TextGeneratorState,
    textGeneratorReducer,
    INITIAL_STATE as TEXT_GENERATOR_INITIAL_STATE
} from '../TextGenerator/_duck/reducers';

import {
    LessonsLoaderState,
    INITIAL_STATE as LESSONSLOADER_INITIAL_STATE
} from '../LessonsLoader/_duck/reducers';

import {
    LessonButtonsState,
    lessonButtonsReducer,
    INITIAL_STATE as LESSONBUTTONS_INITIAL_STATE
} from '../Lesson/LessonButtons/_duck/reducers';

export const INITIAL_STATE = {
    [comparator]: { ...COMPARATOR_INITIAL_STATE },
    [lesson]: { ...LESSON_INITIAL_STATE },
    [textGenerator]: { ...TEXT_GENERATOR_INITIAL_STATE },
    [lessonsLoader]: { ...LESSONSLOADER_INITIAL_STATE },
    [lessonButtons]: { ...LESSONBUTTONS_INITIAL_STATE }
};

// @@components_comparator
const regExp = (regexp: string): RegExp => RegExp(`@@components_${regexp}/`,'gi');
const testRegExp = (actionType: string, str: string): boolean => regExp(str).test(actionType);

const reducer: Reducer<ComponentsState, ComponentsActions> = (state = INITIAL_STATE, action) => {
    const { type } = action;
    switch (true) {
        case testRegExp(type, lesson): {
            return {
                ...state,
                [lesson]: lessonReducer(state[lesson], action)
            };
        }

        case testRegExp(type, stats):
        case testRegExp(type, comparator): {
            return {
                ...state,
                [comparator]: comparatorReducer(state[comparator], action)
            };
        }

        case testRegExp(type, textGenerator): {
            return {
                ...state,
                [textGenerator]: textGeneratorReducer(state[textGenerator], action)
            };
        }

        case testRegExp(type, lessonButtons): {
            return {
                ...state,
                [lessonButtons]: lessonButtonsReducer(state[lessonButtons], action)
            };
        }

        default: {
            return { ...state };
        }
    }
}

export { reducer as componentsReducer };

export interface ComponentsState {
    [comparator]: ComparatorState;
    [lesson]: LessonState;
    [textGenerator]: TextGeneratorState;
    [lessonsLoader]: LessonsLoaderState;
    [lessonButtons]: LessonButtonsState;
};