import { Dispatch } from 'redux';
import { LocalStorageItemEnum } from '@appTypes';
import { LessonContainersEnum } from '@lessonTypes';

import { localStorageGetItem } from '@app/LocalStorage/_duck/operations';
import { restoreState } from '../actions';

/** Containers that require restoring state */
const restoreStateContainers = [
    LessonContainersEnum.lessonComponent,
    LessonContainersEnum.lessonComparator,
    LessonContainersEnum.lessonStats
];

export const onRestoreState = (): any => (
    async ( dispatch: Dispatch ): Promise<void> => {

        let data = localStorageGetItem( LocalStorageItemEnum.lesson );

        for ( let container of restoreStateContainers ) {
            let containerData = data[ container ];

            if ( containerData ) {
                let answer = dispatch( restoreState[ container ]( containerData ) );

                if ( answer ) {
                    containerData = null; // GC
                    answer = null; // GC
                }
            }
        }

        data = null;
    }
);

export default { onRestoreState };
