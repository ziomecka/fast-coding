// Use ComponentsContainersEnum enum in '@@components_
// Important for components reducer

export enum StatsActionsEnum {
    COMPONENTS_STATS_TIMER_START = '@@components_stats/TIMER_START',
    COMPONENTS_STATS_TIMER_STOP = '@@components_stats/TIMER_STOP',
    COMPONENTS_STATS_RESET = '@@components_stats/RESET',
    COMPONENTS_STATS_PAUSE = '@@components_stats/PAUSE',
    COMPONENTS_STATS_UNPAUSE = '@@components_stats/UNPAUSE',
    COMPONENTS_STATS_RESTORE_STATE = '@@components_stats/RESTORE_STATE'
}

export enum StatsTimeUnitsEnum {
    Seconds = 'Seconds',
    Minutes = 'Minutes',
    Hours = 'Hours'
}
