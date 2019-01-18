export enum LessonStatsActionsEnum {
    LESSON_LESSON_STATS_TIMER_START = '@@lesson_lessonStats/TIMER_START',
    LESSON_LESSON_STATS_TIMER_STOP = '@@lesson_lessonStats/TIMER_STOP',
    LESSON_LESSON_STATS_RESET = '@@lesson_lessonStats/RESET',
    LESSON_LESSON_STATS_PAUSE = '@@lesson_lessonStats/PAUSE',
    LESSON_LESSON_STATS_UNPAUSE = '@@lesson_lessonStats/UNPAUSE',
    LESSON_LESSON_STATS_RESTORE_STATE = '@@lesson_lessonStats/RESTORE_STATE'
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
