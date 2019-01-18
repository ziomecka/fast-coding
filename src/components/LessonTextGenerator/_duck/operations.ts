import { Dispatch } from 'redux';
import { turnOffLessonTextGenerator } from './actions';

import { updateText } from '@components/Lesson/';

export const onSendText = ( text: string ): any => ( dispatch: Dispatch ): void => {
    if ( dispatch( updateText( text ) ) ) {
        dispatch( turnOffLessonTextGenerator() );
    }
};

export default {
    onSendText
};
