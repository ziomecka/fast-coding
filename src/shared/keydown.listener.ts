export const addKeyDownListener = (listener: EventListener): void => {
    document.addEventListener('keydown', listener);
};

export const removeKeyDownListener = (listener: EventListener): void => {
    document.removeEventListener('keydown', listener);
};

export default {
    addKeyDownListener,
    removeKeyDownListener
};