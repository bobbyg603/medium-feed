/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A web component for Medium article preview cards
 * @property title - The title of the article
 * @property author - The author's full name
 * @property thumbnail - The article's thumbnail image url
 * @property categories - An array of strings representing associated topics
 * @property content - The content of the article
 */
@customElement('medium-card')
export class MediumCard extends LitElement {
    static override styles = css`
     :host {
       display: flex;
       border: solid 1px lightgray;
       border-radius: 3px;
     }

    img.thumbnail {
      height: 220px;
      min-width: 330px;
      max-width: 330px;
      object-fit: cover;
    }

    .meta {
        padding: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .meta h2, .meta h3 {
        margin: 0;
    }

    .meta .category {
        color: lightgray;
    }

    .meta p:last-of-type {
        margin-top: auto;
        margin-bottom: 0;
    }
   `;

    @property()
    override title = '';

    @property()
    author = '';

    @property()
    thumbnail = '';

    @property()
    categories = [] as string[];

    @property()
    content = '';

    override render() {
        return html`
        <img class="thumbnail" .src=${this.thumbnail}>
        <div class="meta">
            <h2>${this.title}</h2>
            <h3>${this.author}</h3>
            <p>
                ${this.content
                    .split("<p>")
                    .splice(3)
                    .join('')
                    .replace(/<\/?[^>]+(>|$)/g, "").slice(0, 200)}...
            </p>
            <p>
                ${this.categories.map(category => {
                    return html`
                        <span class="category">${category}</span>
                    `;
                })}
            </p>
        </div>
     `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'medium-card': MediumCard;
    }
}
