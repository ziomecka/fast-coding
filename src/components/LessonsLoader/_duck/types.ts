import { GetResponseI } from '@app/api/';
import { CourseDataType } from '@components/Course/_duck/reducers';
import { LanguagesEnum } from '@applicationTypes';
import { LessonData } from '@components/Lesson/_duck/reducers';

export interface GetLessonsResponseI extends GetResponseI {
    lessons: CourseDataType
}

export interface LessonsDataI {
    title: TextTranslationsI;
    tag: TextTranslationsI;
    type: string;
    lessons: LessonData[];
    description: TextTranslationsI;
    collection: string;
    _id: string;
}

export interface TextTranslationsI {
    // @ts-ignore
    [language: LanguagesEnum]: string
}

export enum LessonsCategoriesEnum {
    JS = 'js',
    basics = 'basics'
}

export interface ILessonsLoaderState {
    loading: boolean;
    error: string;
    lessons: LessonsDataI[];
}
