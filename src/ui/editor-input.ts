import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseElement } from './base'; 

@customElement('editor-input')
export class EditorInput extends BaseElement {
    render() {
        return html`
            <textarea 
                @input=${this.handleInput} 
                @keydown=${this.handleKeydown}
                autofocus 
                rows="1"
                spellcheck="false" 
                class="w-full outline-0 text-transparent h-full caret-sky-500 resize-none placeholder:text-gray-400 [&::selection]:bg-[#264F78]/50"
                placeholder="Type your code here ..."
                tabindex="0"
                style="font-family:consolas;"
            ></textarea>
        `;
    }

    handleInput(e: InputEvent) {
        const target = e.target as HTMLTextAreaElement;
        // Auto-expand logic
        target.style.height = 'auto';
        target.style.height = target.scrollHeight + 'px';
        this.dispatchEvent(new CustomEvent('code-input', {
            detail: target.value,
            bubbles: true,
            composed: true,
        }));
    }

    handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const textarea = e.target as HTMLTextAreaElement;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const value = textarea.value;
            // Insert tab, replacing any selected text
            textarea.value = value.substring(0, start) + '\t' + value.substring(end);
            // Move cursor after the tab
            textarea.selectionStart = textarea.selectionEnd = start + 1;
            // Fire input event to update parent from the textarea itself
            textarea.dispatchEvent(new InputEvent('input', {bubbles: true, composed: true}));
        }
    }
}