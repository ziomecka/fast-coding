import { default as handleKeys } from './handle.keys';
import { default as life } from './life';

export default { ...handleKeys, ...life };

export {
    handleKeyboardDown
} from './handle.keys';

export {
    onAddEventListener,
    onPauseComparator,
    onRemoveEventListener,
    onResetComparator,
    onTurnOffComparator,
    onTurnOnComparator,
    onUnpauseComparator,
    pausedLessonListener,
} from './life';
