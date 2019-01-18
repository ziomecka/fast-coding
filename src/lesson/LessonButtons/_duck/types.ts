export enum LessonButtonsActionsEnum {
    LESSON_LESSON_BUTTONS_MOVE = '@@lesson_lesson_Buttons/MOVE',
    LESSON_LESSON_DRAGABLE_TURNON = '@@lesson_lesson_Buttons/DRAGABLE_TURNON',
    LESSON_LESSON_DRAGABLE_TURNOFF = '@@lesson_lesson_Buttons/DRAGABLE_TURNOFF',
    LESSON_LESSON_DRAGABLE_RESET = '@@lesson_lesson_Buttons/RESET_POSITION',
}

export interface LessonButtonsState {
    left: number | 'auto';
    top: number | 'auto';
    draggable: boolean;
}
