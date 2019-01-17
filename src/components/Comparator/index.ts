export { default } from './container';
export {
    ComparatorActions,
    ComparatorState,
    INITIAL_STATE,
    RestoreStateAction,
    comparatorReducer,
    pauseComparator,
    pausedLessonListener,
    resetComparator,
    restoreState,
    turnOffComparator,
    turnOnComparator,
    unpauseComparator
} from './_duck/';
