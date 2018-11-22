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
    let { errors, correctedErrors, currentSignIndex } = getState()[components][comparator]
    const wasAnError = errors[errors.length - 1] === currentSignIndex;

    if (wasAnError) {
        /** Add to corrected errors only if not already included */
        if (!correctedErrors.includes(currentSignIndex)) {
            correctedErrors.push(currentSignIndex);
        }
        dispatch(correctError(correctedErrors));
    } else {
        dispatch(registerBackspace());
    }

    errors = null; // TODO GC?
    correctedErrors = null;
};

export const onHandleKeyDown = (key: string): any => (dispatch: Dispatch, getState: () => ApplicationState): void => {
    let state = getState()[components];
    let { errors, allErrors, currentSignIndex } = state[comparator];

    const nextCurrentSignIndex = currentSignIndex + 1;
    const expectedSign = state[lesson].text[nextCurrentSignIndex];

    if (key !== expectedSign) {
        /** Add to all errors only if not already included */
        if (!allErrors.includes(nextCurrentSignIndex)) {
            allErrors.push(nextCurrentSignIndex);
        }
        dispatch(registerError(allErrors)); // TODO improve
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