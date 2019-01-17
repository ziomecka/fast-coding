import { Reducer } from 'redux';
import { ILessonsLoaderState } from './types';

export const INITIAL_STATE: ILessonsLoaderState = {
    loading: true,
    error: '',
    lessons: []
};

const reducer: Reducer<ILessonsLoaderState> = ( state = INITIAL_STATE ) => {
    return { ...state };
};

export { reducer as lessonsLoaderReducer };

export default INITIAL_STATE;
