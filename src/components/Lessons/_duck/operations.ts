import { Dispatch } from 'redux';
import { ThunkGetStateType } from '@applicationTypes';
import { closeCourse } from './actions';

export const onCloseCourse = ( id: string ): any => (
    async ( dispatch: Dispatch, getState: ThunkGetStateType ): Promise<boolean> => {

        /** If the course is still opened */
        if ( id === getState().components.lessons.openedCourseId ) {
            let answer = await dispatch( closeCourse() );

            if ( answer ) {
                answer = null; // GC
                /** Course has been closed */
                return true;
            }
        }

        /** Course has been closed but by opening other course */
        return false;
    }
);

export default { onCloseCourse };
