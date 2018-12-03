const keydownListeners = (): KeydownListenersI => {
    let listeners: Map<number, EventListener> = new Map;

    const addKeyDownListener = (listener: EventListener): number => {
        if (!listeners) {
            listeners = new Map;
        }

        document.addEventListener('keydown', listener);
        listeners.set(listeners.size, listener);
        return listeners.size - 1;
    };

    const removeKeyDownListener = (listenerId: number): boolean => {
        document.removeEventListener('keydown', listeners.get(listenerId));
        return listeners.delete(listenerId);
    };

    const removeAllKeyDownListeners = (): boolean => {
        if (listeners.size) {
            listeners.forEach(listener => document.removeEventListener('keydown', listener));
            listeners.clear();
        }
        return true;
    };

    return {
        addKeyDownListener,
        removeKeyDownListener,
        removeAllKeyDownListeners
    };
}

export default keydownListeners;

interface KeydownListenersI {
    addKeyDownListener: (e: EventListener) => number;
    removeKeyDownListener: (listenerId: number) => boolean;
    removeAllKeyDownListeners: () => boolean;
}