import { Action, Dispatch } from 'redux';
import { LocalStorageItemEnum } from '@appTypes';

import { localStorageGetItem } from '@app/LocalStorage/_duck/operations';
import { restoreState } from '@lesson/_actions/';

export const onRestoreState = (): any => (
    async ( dispatch: Dispatch ): Promise<Action> => (
        dispatch( restoreState( localStorageGetItem( LocalStorageItemEnum.lesson ) ) )
    )
);

export default { onRestoreState };
