import { Reducer } from 'redux';
import { ICoursesLoaderState } from './types';

export const INITIAL_STATE: ICoursesLoaderState = {
    loading: true,
    error: '',
    lessons: []
};

const reducer: Reducer<ICoursesLoaderState> = ( state = INITIAL_STATE ) => {
    return { ...state };
};

export { reducer as coursesLoaderReducer };

export default INITIAL_STATE;
