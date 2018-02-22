declare let EditorObservable: {
    bindPendingEventDelegates(): void;
    toggleNativeEvent(name: any, state: any): void;
    unbindAllNativeEvents(): void;
};
export default EditorObservable;
