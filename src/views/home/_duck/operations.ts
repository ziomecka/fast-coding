import { manageButtonFocus as buttonFocus } from '../../../shared/button.focus';
import keydownListeners from '../../../shared/keydown.listener';

export const buttonsIds = [ 'homeSeeLessons', 'homeStartTyping' ];

const manageButtonFocus = buttonFocus(buttonsIds, 1);
const manageKeydownListeners = keydownListeners();

const manageFocus = (e: KeyboardEvent): void => manageButtonFocus(e);

export const onAddKeyDownListener = () => {
    manageKeydownListeners.addKeyDownListener(manageFocus);
};

export const onRemoveKeyDownListener = () => {
    manageKeydownListeners.removeAllKeyDownListeners();
};

