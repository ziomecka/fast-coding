export enum LessonStatsActionsEnum {
    COMPONENTS_LESSON_STATS_TIMER_START = '@@components_lessonStats/TIMER_START',
    COMPONENTS_LESSON_STATS_TIMER_STOP = '@@components_lessonStats/TIMER_STOP',
    COMPONENTS_LESSON_STATS_RESET = '@@components_lessonStats/RESET',
    COMPONENTS_LESSON_STATS_PAUSE = '@@components_lessonStats/PAUSE',
    COMPONENTS_LESSON_STATS_UNPAUSE = '@@components_lessonStats/UNPAUSE',
    COMPONENTS_LESSON_STATS_RESTORE_STATE = '@@components_lessonStats/RESTORE_STATE'
}

export enum LessonStatsTimeUnitsEnum {
    Seconds = 'Seconds',
    Minutes = 'Minutes',
    Hours = 'Hours'
}

export interface LessonStatsState {
    running: boolean;
    start: number;
    stop: number;
    time: number;
}
