import { Dispatch } from 'redux';
import { ILessonState } from '@lessonTypes';
import { LocalStorageItemEnum, } from '@appTypes';
import { ThunkGetStateType } from '@applicationTypes';
import { localStorageSetItem } from '@app/LocalStorage/_duck/operations';

export const onKeepState = ( lessonState?: ILessonState ): any => (
    ( dispatch: Dispatch, getState: ThunkGetStateType ): boolean => (
        localStorageSetItem( LocalStorageItemEnum.lesson, lessonState || getState().lesson )
    )
);

export default { onKeepState };
