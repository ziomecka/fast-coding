export enum LessonTextGeneratorActionsEnum {
    COMPONENTS_LESSON_TEXT_GENERATOR_TURNON = '@@components_lesson_text_generator/TURNON',
    COMPONENTS_LESSON_TEXT_GENERATOR_TURNOFF = '@@components_lesson_text_generator/TURNOFF'
}

export interface ILessonTextGeneratorState {
    turnedOn: boolean;
}
