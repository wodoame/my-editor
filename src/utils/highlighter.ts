import hljs from 'highlight.js';

export class Highlighter {
    private language: string;
    constructor(language: string) {
        this.language = language;
    }

    highlight(text: string) {
        const result = hljs.highlight(text, {language: this.language});
        return result.value;
    }
}