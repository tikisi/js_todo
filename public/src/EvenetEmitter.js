export class EventEmitter {
    constructor() {
        this._listeners = new Map();
    }

    addEventListener(type, listener) {
        if (!this._listeners.has(type)) {
            this._listeners.set(type, new Set());
        }
        const set = this._listeners.get(type);
        set.add(listener);
    }

    emit(type) {
        const listenerSet = this._listeners.get(type);
        if (!listenerSet) return;
        listenerSet.forEach(listener => {
            listener.call(this);
        });
    }

    removeEventListener(type, listener) {
        const listenerSet = this._listeners.get(type);
        if (!listenerSet) return;
        listenerSet.forEach(ownListener => {
            if (ownListener == listener)
                listenerSet.delete(ownListener);
        });
    }
}