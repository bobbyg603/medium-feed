/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import "./medium-card";
import { MediumPost } from './medium-post';

/**
 * Displays a collection of medium article cards.
 *
 * @property url - The Medium RSS feed url
 * @property count - The number of preview cards to display
 */
@customElement('medium-feed')
export class MediumPreviewElement extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    .container {
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
    }

    medium-card {
      cursor: pointer;
    }
  `;

  @property()
  url = '';

  @property()
  count = 10;

  @state()
  private _state: { posts: MediumPost[] } = { posts: [] };

  override connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  override render() {
    return html`
      <div class="container">
      ${
        this._state.posts.slice(0, this.count).map(post => {
          return html`
            <medium-card 
              .url=${post.link}
              .title=${post.title}
              .author=${post.author}
              .thumbnail=${post.thumbnail}
              .categories=${post.categories}
              .content=${post.content}
              @click=${() => this.cardClick(post.link)}
            ></medium-card>
            <br>
          `;
        })
      }  
      </div>
    `;
  }

  private cardClick(url: string) {
    window.open(url, "_blank");
  }

  private async fetchData() {
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${this.url}`;
    const response = await fetch(url);
    const json = (await response.json()) as MediumResponse;
    const posts = json.items;

    this._state = { posts };
  }
}

interface MediumResponse {
  items: MediumPost[];
}

declare global {
  interface HTMLElementTagNameMap {
    'medium-feed': MediumPreviewElement;
  }
}
