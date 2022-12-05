import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import "./medium-card-header";
import "./medium-card-thumbnail";
import "./medium-card-body";
import "./medium-card-footer";

/**
 * A web component for generic link preview cards
 * @property thumbnail - card's thumbnail image url
 * @property header - larger header to use at the top of the card
 * @property author - smaller header to use at the top of the card
 * @property body - card's body content
 * @property footer - card's footer content
 */
@customElement('medium-card')
export class MediumCardElement extends LitElement {
    static override styles = css`
     :host {
       display: flex;
       border: solid 1px lightgray;
       border-radius: 3px;
     }

    .right {
        padding: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    `;

    @property()
    thumbnail = '';

    @property()
    header = '';

    @property()
    subheader = '';

    @property()
    body = '';

    @property()
    footer = '';

    override render() {

        return html`
            <div class="left">
                <medium-card-thumbnail .src=${this.thumbnail}></medium-card-thumbnail>
            </div>
            <div class="right">
                <medium-card-header .header="${this.header}" .subheader="${this.subheader}"></medium-card-header>
                <medium-card-body .body="${this.body}"></medium-card-body>
                <medium-card-footer .footer="${this.footer}"></medium-card-footer>
            </div>
     `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'medium-card': MediumCardElement;
    }
}
