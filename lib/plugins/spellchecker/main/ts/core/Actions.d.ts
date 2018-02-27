import { Editor } from 'tinymce/core/api/Editor';
declare const _default: {
    spellcheck: (editor: Editor, pluginUrl: string, startedState: any, textMatcherState: any, lastSuggestionsState: any, currentLanguageState: any) => void;
    checkIfFinished: (editor: any, startedState: any, textMatcherState: any) => void;
    addToDictionary: (editor: Editor, pluginUrl: string, startedState: any, textMatcherState: any, currentLanguageState: any, word: string, spans: Element[]) => void;
    ignoreWord: (editor: Editor, startedState: any, textMatcherState: any, word: string, spans: Element[], all?: any) => void;
    findSpansByIndex: (editor: any, index: any) => any[];
    getElmIndex: (elm: any) => any;
    markErrors: (editor: any, startedState: any, textMatcherState: any, lastSuggestionsState: any, data: string | {
        words: any;
        dictionary?: any;
    }) => void;
};
export default _default;
