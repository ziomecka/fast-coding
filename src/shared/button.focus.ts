export const getButton = (id: string): HTMLButtonElement => (
    document.querySelector(`button[id="${id}"`)
);

export const manageButtonFocus = (buttonsIds: string[], focusedIndex: number): (e: KeyboardEvent) => void => {
    const { length } = buttonsIds;
    let focusedButton = buttonsIds[focusedIndex];

    const manageFocus = (e: KeyboardEvent) => {
        if (e.keyCode === 9) {
            e.preventDefault();
            let index = buttonsIds.findIndex(item => item === focusedButton);
            const nextIndex = ( ++index <= length - 1 ) ? index : 0;
            focusedButton = buttonsIds[nextIndex];
            try {
                getButton(focusedButton).focus();
            } catch {}
        }
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

        /** If tab */
        if (keyCode === 9) {
            manageFocus(e);
            return true;
        }
    };
};



export default {
    manageButtonFocus,
    getButton
};