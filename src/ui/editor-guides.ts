import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from './base';

@customElement('editor-guides')
export class EditorGuides extends BaseElement {
    @property({ type: String })
    code: string = '';

    render() {
        // Example: parse code for indentation and render guides
        const lines = this.code.split(/\r?\n/);
        console.log(lines); // For debugging purposes
        // const indentSize = 1; // spaces per indent
        const tabWidth = 32; // pixels per tab
        return html`
                ${lines.map((line, _) => {
                    // const match = line.match(/^([ \t]+)/); tabs and spaces
                    const tabmatch = line.match(/^(\t+)/); // only tabs
                    const spacematch = line.match(/^([ ]+)/); // only spaces
                    let indent = 0;
                    if(tabmatch){
                        indent = tabmatch[1].length; // number of tabs
                    }
                    if(spacematch){
                        indent = Math.floor(spacematch[1].length / 4); // number of spaces, assuming 4 spaces per indent
                    }
                    const guideCount = indent;
                    return html`
                        <div class="relative h-5">
                            ${Array.from({ length: guideCount }).map((_, i) => html`
                             <span class="absolute top-0 bottom-0 w-[1px] bg-gray-500 opacity-30" style="left:${i * tabWidth}px;"></span>
                            `)}
                        </div>
                    `;
                })}
        `;
    }
}
