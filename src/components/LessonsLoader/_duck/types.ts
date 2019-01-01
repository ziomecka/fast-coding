import { GetResponseI } from '@app/api/';
import { CourseDataType } from '../../Course/_duck/reducers';
import { LanguagesEnum } from '@applicationTypes';
import { LessonData } from '../../Lesson/_duck/reducers';

export interface GetLessonsResponseI extends GetResponseI {
    lessons: CourseDataType
};

export interface LessonsDataI {
    title: TextTranslationsI;
    tag: TextTranslationsI;
    description: TextTranslationsI;
    type:"free"
    lessons: LessonData[]
};

export interface TextTranslationsI {
    // @ts-ignore
    [language: LanguagesEnum]: string
}

export enum LessonsCategoriesEnum {
    JS = 'js',
    basics = 'basics'
};