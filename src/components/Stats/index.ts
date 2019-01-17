export { default } from './container';
export {
    INITIAL_STATE,
    RestoreStateAction,
    StatsActionsEnum,
    StatsState,
    statsReducer,
    onPauseTimer,
    onStartTimer,
    onStopTimer,
    onUnpauseTimer,
    resetStats
} from './_duck/';
