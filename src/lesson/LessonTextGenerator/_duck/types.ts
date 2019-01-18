export enum LessonTextGeneratorActionsEnum {
    LESSON_LESSON_TEXT_GENERATOR_TURNON = '@@lesson_text_generator/TURNON',
    LESSON_LESSON_TEXT_GENERATOR_TURNOFF = '@@lesson_text_generator/TURNOFF'
}

export interface ILessonTextGeneratorState {
    turnedOn: boolean;
}
