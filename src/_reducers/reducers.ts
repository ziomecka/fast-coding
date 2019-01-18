
import {
    INITIAL_STATE as APP_INITIAL_STATE,
    AppState,
    appReducer,
} from '@app/_reducers/';

import {
    INITIAL_STATE as COURSES_INITIAL_STATE,
    CoursesState,
    coursesReducer,
} from '@courses/_reducers/';

import {
    INITIAL_STATE as LESSON_INITIAL_STATE,
    LessonState,
    lessonReducer,
} from '@lesson/_reducers/';

import {
    CSRActionsEnum,
} from '@appTypes';

import {
    LocalizeState,
    localizeReducer,
} from 'react-localize-redux';

import { CSRActions } from '@app/CSR/_duck/actions';
import { INITIAL_STATE as LOCALIZA_INITIAL_STATE } from '@app/Localize/_duck/reducers';
import { Reducer } from 'redux';
import { csrReducer } from '@app/CSR/_duck/reducers';

export const INITIAL_STATE = {
    app: { ...APP_INITIAL_STATE },
    courses: { ...COURSES_INITIAL_STATE },
    lesson: { ...LESSON_INITIAL_STATE },
    localize: { ...LOCALIZA_INITIAL_STATE }
};

const {
    APP_CSR_CHANGE_LOADING_STATE,
    APP_CSR_REPORT_ERROR,
    APP_CSR_UPDATE_DATA
} = CSRActionsEnum;

const reducers: Reducer<ApplicationState> = ( state = INITIAL_STATE, action ): ApplicationState => {
    /** get ^@@.*_$ from type */
    const actionType = action.type.slice( 0, action.type.indexOf( '_' ) );

    switch ( true ) {
        // TODO improve - przeniesc csr poza app
        case action.type === APP_CSR_CHANGE_LOADING_STATE:
        case action.type === APP_CSR_REPORT_ERROR:
        case action.type === APP_CSR_UPDATE_DATA: {
            return {
                ...state,
                ...csrReducer( state, action as CSRActions )
            };
        }

        /** TODO Improve */
        case ( actionType === '@@app' ): {
            return {
                ...state,
                // @ts-ignore
                app: { ...appReducer( state.app, action ) }
            };
        }

        /** TODO Improve */
        case ( actionType === '@@courses' ): {
            return {
                ...state,
                // @ts-ignore
                courses: { ...coursesReducer( state.courses, action ) }
            };
        }

        /** TODO Improve */
        case ( actionType === '@@lesson' ): {
            return {
                ...state,
                // @ts-ignore
                lesson: { ...lessonReducer( state.lesson, action ) }
            };
        }

        default: {
            return {
                ...state,
                // @ts-ignore
                localize: localizeReducer( state.localize, action )
            };
        }
    }
};

export { reducers as applicationReducer };

export interface ApplicationState {
    app: AppState;
    courses: CoursesState;
    lesson: LessonState;
    localize: LocalizeState;
}
