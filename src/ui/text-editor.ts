import { html } from 'lit';
import './editor-input.js';
import './editor-output.js';
import { BaseElement } from './base.js';
import { customElement, property } from 'lit/decorators.js';

@customElement('text-editor')
export class TextEditor extends BaseElement {
    @property({ type: String })
    code = ''; 

    render() {
        return html`
        <div class="p-2 h-full hljs text-sm overflow-y-auto">
            <div class="relative w-full">
                <editor-output
                    class="absolute top-0 left-0 pointer-events-none w-full z-[1]"
                    code=${this.code}
                ></editor-output>
                <editor-input
                    class="absolute top-0 left-0 w-full z-[2]"
                    @code-input=${this.handleInput}
                ></editor-input>
            </div>
        </div>
        `;
    }

    handleInput(e: CustomEvent) {
        // console.log('Code input received:', e.detail);
        this.code = e.detail;
    }
}