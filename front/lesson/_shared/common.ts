import { ApplicationState } from '@src/_reducers';
import { ILessonCommonState } from '@lessonTypes';

export const mapDispatchToProps = ( state: ApplicationState ): ILessonCommonState => ( {
    ...state.lesson
} );
