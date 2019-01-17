export enum TextGeneratorActionsEnum {
    COMPONENTS_TEXT_GENERATOR_TURNON = '@@components_text_generator/TURNON',
    COMPONENTS_TEXT_GENERATOR_TURNOFF = '@@components_text_generator/TURNOFF'
}

export interface ITextGeneratorState {
    turnedOn: boolean;
}
