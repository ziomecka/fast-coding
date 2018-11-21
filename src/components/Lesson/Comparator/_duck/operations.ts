import { Dispatch } from 'redux';
import { ApplicationState } from '../../../../_reducers';

import { ApplicationContainers, ComponentsContainers } from '../../../../_common/';

const { components } = ApplicationContainers;
const { comparator, lesson } = ComponentsContainers;

import {
    registerNewKey,
    registerError,
    registerBackspace,
    correctError
} from './actions';

export const onHandleBackSpace = (): any => (dispatch: Dispatch, getState: () => ApplicationState): void => {
    let { errors, correctedErrors, currentSignIndex } = getState()[comparator]
    const wasAnError = errors[errors.length - 1] === currentSignIndex;

    if (wasAnError) {
        dispatch(correctError(correctedErrors.push(currentSignIndex + 1))); // TODO improve
    } else {
        dispatch(registerBackspace());
    }

    errors = null; // TODO GC?
    correctedErrors = null;
};

export const onHandleKeyDown = (key: string): any => (dispatch: Dispatch, getState: () => ApplicationState): void => {
    let state = getState()[components];
    let { errors, allErrors, currentSignIndex } = state[comparator];

    const expectedSign = state[lesson].text[currentSignIndex + 1];
    const nextCurrentSignIndex = currentSignIndex + 1;

    if (key !== expectedSign) {
        dispatch(registerError(allErrors.push(nextCurrentSignIndex))); // TODO improve
    } else {
        dispatch(registerNewKey());
    }

    state = null; // TODO GC?
    errors = null;
    allErrors = null;
};


export default {
    onHandleBackSpace,
    onHandleKeyDown
};