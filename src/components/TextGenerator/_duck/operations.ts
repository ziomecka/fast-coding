import { Dispatch } from 'redux';
import { turnOffTextGenerator } from './actions';

import { updateText } from '@components/Lesson/';

export const onSendText = ( text: string ): any => ( dispatch: Dispatch ): void => {
    if ( dispatch( updateText( text ) ) ) {
        dispatch( turnOffTextGenerator() );
    }
};

export default {
    onSendText
};
