import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import "./card/medium-card";
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
      display: flex;
      flex-direction: column;
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
      ${
        this._state.posts.slice(0, this.count).map(post => {
          const header = post.title;
          const subheader = post.author;
          const thumbnail = post.thumbnail;
          const body = `${this.trimContent(post.content)}...`;
          const footer = post.categories.join(' ');

          return html`
            <medium-card 
              .thumbnail="${thumbnail}"
              .header="${header}"
              .subheader="${subheader}"
              .body="${body}"
              .footer="${footer}"
              @click=${() => this.cardClick(post.link)}
            ></medium-card>
            <br>
          `;
        })
      }  
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

  private trimContent(content: string) {
    return content
      .split("<p>")
      .splice(3)
      .join('')
      .replace(/<\/?[^>]+(>|$)/g, "")
      .split(' ')
      .slice(0, 32)
      .join(' ');
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
