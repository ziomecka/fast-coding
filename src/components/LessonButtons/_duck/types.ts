export enum LessonButtonsActionsEnum {
    COMPONENTS_LESSON_BUTTONS_MOVE = '@@components_lesson_Buttons/MOVE',
    COMPONENTS_LESSON_DRAGABLE_TURNON = '@@components_lesson_Buttons/DRAGABLE_TURNON',
    COMPONENTS_LESSON_DRAGABLE_TURNOFF = '@@components_lesson_Buttons/DRAGABLE_TURNOFF',
    COMPONENTS_LESSON_DRAGABLE_RESET = '@@components_lesson_Buttons/RESET_POSITION',
}

export interface LessonButtonsState {
    left: number | 'auto';
    top: number | 'auto';
    draggable: boolean;
}