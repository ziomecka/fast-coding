import { default as handleKeys } from './handle.keys';
import { default as life } from './life';

export default { ...handleKeys, ...life };

export {
    onPauseComparator as pauseComparator,
    onResetComparator as resetComparator,
    onTurnOffComparator as turnOffComparator,
    onTurnOnComparator as turnOnComparator,
    onUnpauseComparator as unpauseComparator,
    pausedLessonListener as pausedLessonListener,
    onListenKeys as listenKeys,
    onStopListenKeys as stopListenKeys
} from './life';
