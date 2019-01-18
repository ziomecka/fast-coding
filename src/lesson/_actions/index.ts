import { LessonComponentActions } from '@lesson/LessonComponent/_duck/actions';
import { LessonButtonsActions } from '@lesson/LessonButtons/_duck/actions';
import { LessonComparatorActions } from '@lesson/LessonComparator/';
import { LessonStatsActions } from '@lesson/LessonStats/_duck/actions';
import { LessonTextGeneratorActions } from '@lesson/LessonTextGenerator/_duck/actions';

export type TLessonActions =
LessonComponentActions |
LessonButtonsActions |
LessonComparatorActions |
LessonStatsActions |
LessonTextGeneratorActions;

