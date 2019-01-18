import { CourseDataType } from '@courses/Course/';
import { GetResponseI } from '@app/api/';
import { LessonData } from '@lesson/Lesson/';
import { TextTranslationsI } from '@applicationTypes';

export interface IGetCoursesResponse extends GetResponseI {
    courses: CourseDataType
}

export interface ICourseData {
    title: TextTranslationsI;
    tag: TextTranslationsI;
    type: string;
    lessons: LessonData[];
    description: TextTranslationsI;
    collection: string;
    _id: string;
}

export enum LessonsCategoriesEnum {
    JS = 'js',
    basics = 'basics'
}

export interface ICoursesLoaderState {
    loading: boolean;
    error: string;
    courses: ICourseData[];
}
