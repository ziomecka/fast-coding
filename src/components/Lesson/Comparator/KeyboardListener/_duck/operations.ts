import { Dispatch } from 'redux';

import {
    onHandleBackSpace as comparatorOnHandleBackspace,
    onHandleKeyDown as comparatorOnHandleKeyDown
} from '../../_duck/operations';

const onHandleBackSpace = (): any => (dispatch: Dispatch): void => {
    dispatch(comparatorOnHandleBackspace());
};

const onHandleKeyDown = (key: string): any => (dispatch: Dispatch): void => {
    dispatch(comparatorOnHandleKeyDown(key));
};

export default {
    onHandleKeyDown,
    onHandleBackSpace
};