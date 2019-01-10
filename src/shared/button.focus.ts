export const getButton = (id: string): HTMLButtonElement => (
    document.querySelector(`button[id="${id}"`)
);

export const manageButtonFocus = (buttonsIds: string[], focusedIndex: number): (e: KeyboardEvent) => void => {
    const { length } = buttonsIds;
    let focusedButton = buttonsIds[focusedIndex];

    const manageFocus = (e: KeyboardEvent) => {
        e.preventDefault();
        const { keyCode } = e;

        let index = buttonsIds.findIndex(item => item === focusedButton);
        let nextIndex;

        /** If tab or arrow right */
        if (keyCode === 9 || keyCode === 39) {
            nextIndex = index++ <= length - 2 ? index : 0;
        }

        /** If arrow left */
        if (keyCode === 37) {
            nextIndex = --index >= 0 ? index : length - 1;
        }

        try {
            getButton(buttonsIds[nextIndex]).focus();
            focusedButton = buttonsIds[nextIndex];
        // TODO code
        /* eslint-disable no-empty */
        } catch (err) {}
        /* eslint-enable no-empty */
    };

    return (e: KeyboardEvent): boolean => {
        const { keyCode } = e;

        /** If enter */
        if (keyCode === 13) {
            try {
                getButton(focusedButton).click();
            } catch {
                return false;
            }
            return true;
        }

        /** If tab or arrow right or arrow left */
        if (keyCode === 9 || keyCode === 39 || keyCode === 37) {
            manageFocus(e);
            return true;
        }
    };
};

export default {
    manageButtonFocus,
    getButton
};