import { html } from 'lit';
import { Highlighter } from '../utils/highlighter';
import { BaseElement } from './base';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('editor-output')
export class EditorOutput extends BaseElement {
    highlighter: Highlighter;
    @property({ type: String })
    code: string = '';

    @property({ type: String })
    language: string = 'javascript';

    constructor() {
        super();
        this.highlighter = new Highlighter(this.language);
    }

    render() {
        const highlightedCode = this.highlighter.highlight(this.code);

        // For debugging purposes
        // console.log(highlightedCode);

        return html`
            <div>
                <pre><code class="language-${this.language}">${unsafeHTML(highlightedCode)}</code></pre>
            </div>
        `;
    }
}