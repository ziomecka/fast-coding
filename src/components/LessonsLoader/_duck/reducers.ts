import { Reducer } from 'redux';
import { LessonsDataI } from './types';

export const INITIAL_STATE: LessonsLoaderState = {
    loading: true,
    error: '',
    lessons: []
};

const reducer: Reducer<LessonsLoaderState> = (state = INITIAL_STATE) => {
    return { ...state };
};

export { reducer as lessonsLoaderReducer };

export default INITIAL_STATE;

export interface LessonsLoaderState {
    loading: boolean;
    error: string;
    lessons: LessonsDataI[];
}