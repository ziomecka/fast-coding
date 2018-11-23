import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as KeyboardListener } from './component';

import { default as operations } from './_duck/operations'
import { KeyboardListenerState } from './_duck/reducers';

import { ApplicationState } from '../../../../_reducers';
import { ApplicationContainers, ComponentsContainers, ComparatorContainers } from '../../../../_common';

const { components } = ApplicationContainers;
const { comparator } = ComponentsContainers;
const { keyboardListener } = ComparatorContainers;
const { onHandleBackSpace, onHandleKeyDown } = operations;

const mapStateToProps = (state: ApplicationState): KeyboardListenerState => ({
    ...state[components][comparator][keyboardListener]
});

const mapDispatchToProps = (dispatch: Dispatch): KeyboardListenerDispatch => ({
    handleKeyDown: (key) => dispatch(onHandleKeyDown(key)),
    handleBackSpace: () => dispatch(onHandleBackSpace())
});

const KeyboardListenerContainer = connect(mapStateToProps, mapDispatchToProps)(KeyboardListener);

export default KeyboardListenerContainer;

export interface KeyboardListenerDispatch {
    handleKeyDown: (key: string) => void;
    handleBackSpace: () => void;
};

export interface KeyboardListenerProps extends KeyboardListenerDispatch, KeyboardListenerState {};