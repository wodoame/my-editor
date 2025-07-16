import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from './base';

@customElement('editor-linenumbers')
export class EditorLineNumbers extends BaseElement {
    @property({ type: String })
    code: string = '';

    render() {
        // Split code into lines
        const lines = this.code.split(/\r?\n/);
        return html`
            <div class="flex flex-col items-end justify-end select-none text-gray-400 text-sm pr-1" style="font-family:consolas">
                ${lines.map((_, i) => html`<div class="align-text-bottom">${i + 1}</div>`)}
            </div>
        `;
    }
}
