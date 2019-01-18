import { GetResponseI } from '@app/api/';
import { CourseDataType } from '@components/Course/';
import { LanguagesEnum } from '@applicationTypes';
import { LessonData } from '@components/Lesson/';

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

export interface ICoursesLoaderState {
    loading: boolean;
    error: string;
    lessons: LessonsDataI[];
}
