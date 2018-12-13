import { GetResponseI } from '../../../app/api/';
import { CourseDataType } from '../../Lessons/_duck/reducers';
import { TextTranslationsI } from '../../../_common';
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
