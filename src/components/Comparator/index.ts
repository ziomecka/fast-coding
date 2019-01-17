export { default } from './container';
export {
    ComparatorActions,
    ComparatorState,
    comparatorReducer,
    INITIAL_STATE,
    RestoreStateAction,
    onPauseComparator,
    onResetComparator,
    onTurnOffComparator,
    onUnpauseComparator,
    pausedLessonListener
} from './_duck/';
