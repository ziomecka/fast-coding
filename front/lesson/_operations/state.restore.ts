import { Action, Dispatch } from 'redux';
import { LocalStorageItemEnum } from '@appTypes';

import { localStorageGetItem } from '@app/LocalStorage/_duck/operations';
import { restoreState } from '@lesson/_actions/';

import { onPauseLesson } from './life';
import { pausedLessonListener } from '@lesson/LessonComparator/';

export const onRestoreState = (): any => (
    async ( dispatch: Dispatch ): Promise<Action> => {
        const { paused } = localStorageGetItem( LocalStorageItemEnum.lesson );

        if ( paused ) {
            /** If paused lesson is refreshed then the pausedLessonListener will work */
            dispatch( onPauseLesson( pausedLessonListener ) );
        }

        return dispatch( restoreState( localStorageGetItem( LocalStorageItemEnum.lesson ) ) );
    }
);

export default { onRestoreState };
