import { html } from 'lit';
import './editor-input.ts';
import './editor-output.ts';
import './editor-linenumbers.ts';
import './editor-guides.ts'
import { BaseElement } from './base.js';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

@customElement('text-editor')
export class TextEditor extends BaseElement {
    @property({ type: String })
    code = '';

    private scrollTimer: number | undefined;
    private scrollDiv?: HTMLDivElement;

    render() {
        return html`
        <div
            class="p-2 h-full hljs text-sm overflow-y-auto custom-scrollbar flex"
            ${ref((el: Element | undefined) => {
                this.scrollDiv = el instanceof HTMLDivElement ? el : undefined;
            })}
        >
            <editor-linenumbers code=${this.code}></editor-linenumbers>
            <div class="relative">
                <editor-output
                class="absolute top-0 left-0 pointer-events-none min-w-full z-[1]"
                code=${this.code}
                ></editor-output>
                <editor-input
                class="absolute top-0 left-0 w-full z-[2]"
                @code-input=${this.handleInput}
                ></editor-input>
                <editor-guides
                class="absolute top-0 left-0 w-full h-full pointer-events-none z-[3]"
                code=${this.code}></editor-guides>
            </div>
        </div>
        `;
    }

    firstUpdated() {
        if (this.scrollDiv) {
            this.scrollDiv.addEventListener('scroll', () => {
                this.scrollDiv!.classList.add('scrolling');
                window.clearTimeout(this.scrollTimer);
                this.scrollTimer = window.setTimeout(() => {
                    this.scrollDiv!.classList.remove('scrolling');
                }, 400);
            });
        }
    }

    handleInput(e: CustomEvent) {
        this.code = e.detail;
    }
}