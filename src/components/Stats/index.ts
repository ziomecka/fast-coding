export { default } from './container';
export {
    INITIAL_STATE,
    RestoreStateAction,
    StatsActionsEnum,
    StatsState,
    statsReducer,
    pauseStats,
    resetStats,
    startStats,
    stopStats,
    unpauseStats
} from './_duck/';
