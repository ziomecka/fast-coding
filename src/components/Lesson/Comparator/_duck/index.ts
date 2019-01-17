export {
    handleKeyboardDown,
    onAddEventListener,
    onPauseComparator,
    onRemoveEventListener,
    onResetComparator,
    onTurnOffComparator,
    onTurnOnComparator,
    onUnpauseComparator,
    pausedLessonListener,
} from './operations/';

export { ComparatorState, INITIAL_STATE, comparatorReducer } from './reducers';
export { ComparatorActions, restoreState } from './actions';
