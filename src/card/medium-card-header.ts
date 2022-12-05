import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Medium card header sub-component
 * @property header - larger header
 * @property subheader - smaller header
 */
@customElement('medium-card-header')
export class MediumCardHeaderElement extends LitElement {
    static override styles = css`
        :host {
            flex-grow: 1;
        }

        h2, h3 {
            margin: 0;
            color: var(--medium-header-color);
        }
    `;

    @property()
    header = '';

    @property()
    subheader = '';

    override render() {
        return html`
            <h2 class="header">${this.header}</h2>
            <h3 class="subheader">${this.subheader}</h3>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'medium-card-header': MediumCardHeaderElement;
    }
}
