import { BaseElement } from "./ui/base";
import { customElement } from "lit/decorators.js";
import { html } from "lit";
import { Highlighter } from "./utils/highlighter";

const highlighter = new Highlighter('javascript');
const code = highlighter.highlight('console.log()');
console.log(code); // Output: console.log()

@customElement('my-button')
export class MyButton extends BaseElement{
  render(){
      return html`
        <button class="bg-sky-500 p-4 rounded">Click me</button>
      `;
  }
}