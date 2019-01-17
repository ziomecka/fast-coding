export {
    onPauseTimer as pauseStats,
    onStartTimer as startStats,
    onStopTimer as stopStats,
    onUnpauseTimer as unpauseStats,
} from './operations';

export {
    StatsActionsEnum,
    StatsState,
    StatsTimeUnitsEnum
} from './types';

export {
    RestoreStateAction,
    resetStats
} from './actions';

export {
    INITIAL_STATE,
    statsReducer
} from './reducers';
