
import { LanguagesEnum } from '@appTypes';

export enum ComponentsContainers {
    comparator = 'COMPARATOR',
    lesson = 'LESSON',
    textGenerator = 'TEXT_GENERATOR',
    lessonsLoader = 'LESSONS_LOADER',
    lessons = 'LESSONS',
    lessonButtons = 'LESSON_BUTTONS'
};

export enum LessonsCategoriesEnum {
    JS = 'js',
    basics = 'basics'
};

export interface TextTranslationsI {
    // @ts-ignore
    [language: LanguagesEnum]: string
}