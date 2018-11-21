// import { } from 'redux-thunk';
import { Dispatch } from 'redux';

import { turnOnTextGenerator } from '../../TextGenerator/_duck/actions';
import { updateLesson } from '../../Lesson/_duck/actions';

import { LessonData } from '../../Lesson/_duck/reducers';

export const onOpenRandomLesson = (lesson: LessonData): any => (
    async (dispatch: Dispatch ) => {
        console.log("lesson");
        console.log(lesson);
        const response = await dispatch(updateLesson(lesson));
        console.log('response')
        console.log(response)
        if (response) {
            return dispatch(turnOnTextGenerator());
        }
        return response;
    }
);