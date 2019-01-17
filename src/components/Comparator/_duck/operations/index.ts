import { default as handleKeys } from './handle.keys';
import { default as life } from './life';

export default { ...handleKeys, ...life };

export {
    handleKeyboardDown
} from './handle.keys';

export {
    onAddEventListener as addEventListener,
    onPauseComparator as pauseComparator,
    onRemoveEventListener as removeEventListener,
    onResetComparator as resetComparator,
    onTurnOffComparator as turnOffComparator,
    onTurnOnComparator as turnOnComparator,
    onUnpauseComparator as unpauseComparator,
    pausedLessonListener as pausedLessonListener
} from './life';
