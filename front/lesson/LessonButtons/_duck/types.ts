export enum LessonButtonsActionsEnum {
    LESSON_LESSON_BUTTONS_MOVE = '@@lesson_buttons/MOVE',
    LESSON_LESSON_DRAGABLE_TURNON = '@@lesson_buttons/DRAGABLE_TURNON',
    LESSON_LESSON_DRAGABLE_TURNOFF = '@@lesson_buttons/DRAGABLE_TURNOFF',
    LESSON_LESSON_DRAGABLE_RESET = '@@lesson_buttons/RESET_POSITION',
}

export interface LessonButtonsState {
    left: number | 'auto';
    top: number | 'auto';
    draggable: boolean;
}
