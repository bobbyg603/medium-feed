import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Medium card header sub-component
 * @property src - url to use for the thumbnail image
 */
@customElement('medium-card-thumbnail')
export class MediumCardThumbnailElement extends LitElement {
    static override styles = css`
     :host {
        display: flex;
     }

     img {
        height: 220px;
        width: 330px;
        object-fit: cover;
     }
     `;

    @property()
    src = '';

    override render() {
        return html`<img src="${this.src}">`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'medium-card-thumbnail': MediumCardThumbnailElement;
    }
}
