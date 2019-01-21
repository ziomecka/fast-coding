import { default as handleKeys } from './handle.keys';
import { default as life } from './life';

export default { ...handleKeys, ...life };

export {
    onPauseLessonComparator as pauseLessonComparator,
    onRestartLessonComparator as restartLessonComparator,
    onTurnOffLessonComparator as turnOffLessonComparator,
    onTurnOnLessonComparator as turnOnLessonComparator,
    onUnpauseLessonComparator as unpauseLessonComparator,
    pausedLessonListener as pausedLessonListener,
    onListenKeys as listenKeys,
    onStopListenKeys as stopListenKeys
} from './life';

export {
    isBackspace,
    isEnter,
    isEscape,
    isSpace
} from './helpers';
