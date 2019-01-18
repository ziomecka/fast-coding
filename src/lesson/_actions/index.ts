import { LessonComponentActions } from '@lesson/LessonComponent/_duck/actions';
import { LessonButtonsActions } from '@lesson/LessonButtons/_duck/actions';
import { LessonComparatorActions } from '@lesson/LessonComparator/';
import { LessonStatsActions } from '@lesson/LessonStats/_duck/actions';
import { LessonTextGeneratorActions } from '@lesson/LessonTextGenerator/_duck/actions';
import { LessonCommonActions } from './actions';

export type TLessonActions =
LessonCommonActions |
LessonComponentActions |
LessonButtonsActions |
LessonComparatorActions |
LessonStatsActions |
LessonTextGeneratorActions;

export {
    LessonCommonActions,
    RestoreStateAction,
    endLesson,
    endingLesson,
    notEndingLesson,
    pauseLesson,
    resetLesson,
    restartLesson,
    restoreState,
    startLesson,
    unpauseLesson
} from './actions';
