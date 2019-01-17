export {
    onPauseTimer,
    onStartTimer,
    onStopTimer,
    onUnpauseTimer,
} from './operations';

export {
    StatsActionsEnum,
    StatsState,
    StatsTimeUnitsEnum
} from './types';

export {
    resetStats
} from './actions';

export {
    INITIAL_STATE,
    statsReducer
} from './reducers';
