import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as KeyboardListener } from './component';

import { default as operations } from './_duck/operations'

const { onHandleBackSpace, onHandleKeyDown } = operations;

const mapStateToProps = () => ({});

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

export interface KeyboardListenerProps extends KeyboardListenerDispatch {
    turnedOn: boolean;
};