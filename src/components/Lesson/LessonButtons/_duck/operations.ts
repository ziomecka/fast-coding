import { Dispatch } from 'redux';
import { ApplicationState } from '../../../../_reducers';

import { ApplicationContainers, ComponentsContainers } from '../../../../_common/';

// const { components } = ApplicationContainers;
// const { lessonButtons, lesson } = ComponentsContainers;

import {
    registerNewKey,
    registerError,
    registerBackspace,
    correctError
} from './actions';

export const onRestartLesson = (): any => (dispatch: Dispatch, getState: () => ApplicationState): void => {
}

export default {
};