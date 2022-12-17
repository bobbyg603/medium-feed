
import { MediumCardBodyElement, MediumCardElement, MediumCardHeaderElement, MediumCardThumbnailElement } from '../src';
import { assert, fixture, html } from '@open-wc/testing';

suite('medium-card', () => {
  test('is defined', () => {
    const el = document.createElement('medium-card');
    assert.instanceOf(el, MediumCardElement);
  });

  test('renders card', async () => {
    const el = await fixture(html`<medium-card></medium-card>`);
    assert.shadowDom.equal(
      el,
      `<div class="left">
        <medium-card-thumbnail></medium-card-thumbnail>
      </div>
      <div class="right">
        <medium-card-header></medium-card-header>
        <medium-card-body></medium-card-body>
        <medium-card-footer></medium-card-footer>
      </div>`
    );
  });

  test('renders card with thumbnail', async () => {
    const thumbnail = '👍';
    const el = await fixture(html`<medium-card .thumbnail="${thumbnail}"></medium-card>`);
    const thumbnailElement = el.shadowRoot?.querySelector('medium-card-thumbnail') as MediumCardThumbnailElement;
    assert.equal(thumbnailElement?.src, thumbnail);
  });

  test('renders card with header and subheader', async () => {
    const header = '🧑';
    const subheader = '👶';
    const el = await fixture(html`<medium-card .header="${header}" .subheader="${subheader}"></medium-card>`);
    const headerElement = el.shadowRoot?.querySelector('medium-card-header') as MediumCardHeaderElement;
    assert.equal(headerElement?.header, header);
    assert.equal(headerElement?.subheader, subheader);
  });

  test('renders card with body', async () => {
    const body = '🧍';
    const el = await fixture(html`<medium-card .body="${body}"></medium-card>`);
    const bodyElement = el.shadowRoot?.querySelector('medium-card-body') as MediumCardBodyElement;
    assert.equal(bodyElement?.body, body);
  });

  test('renders card with footer', async () => {
    const footer = '🧍';
    const el = await fixture(html`<medium-card .footer="${footer}"></medium-card>`);
    const footerElement = el.shadowRoot?.querySelector('medium-card-footer') as MediumCardElement;
    assert.equal(footerElement?.footer, footer);
  });

  test('passes css variable styles to child components', async () => {  
    const backgroundColor = 'rgb(255, 0, 0)';
    const borderColor = 'rgb(255, 165, 0)';
    const border = `3px solid ${borderColor}`;
    const borderRadius = '10px';
    const height = '100px';
    const headerColor = 'yellow';
    const bodyColor = 'green';
    const footerColor = 'blue';
    const style = `--medium-card-height: ${height};`
      + `--medium-card-background-color: ${backgroundColor};`
      + `--medium-card-border: ${border};`
      + `--medium-card-border-radius: ${borderRadius};`
      + `--medium-card-header-color: ${headerColor};`
      + `--medium-card-body-color: ${bodyColor};`
      + `--medium-card-footer-color: ${footerColor}`;
    const el = (await fixture(html`<medium-card style="${style}"></medium-card>`)) as MediumCardElement;
    await el.updateComplete;
    const thumbnailElement = el.shadowRoot?.querySelector('medium-card-thumbnail');
    const headerElement = el.shadowRoot?.querySelector('medium-card-header');
    const bodyElement = el.shadowRoot?.querySelector('medium-card-body');
    const footerElement = el.shadowRoot?.querySelector('medium-card-footer');
    assert.equal(getComputedStyle(el).backgroundColor, backgroundColor);
    assert.equal(getComputedStyle(el).border, border);
    assert.equal(getComputedStyle(thumbnailElement!).getPropertyValue('--medium-thumbnail-height').trim(), height);
    assert.equal(getComputedStyle(thumbnailElement!).getPropertyValue('--medium-thumbnail-border-left-radius').trim(), borderRadius);
    assert.equal(getComputedStyle(headerElement!).getPropertyValue('--medium-header-color').trim(), headerColor);
    assert.equal(getComputedStyle(bodyElement!).getPropertyValue('--medium-body-color').trim(), bodyColor);
    assert.equal(getComputedStyle(footerElement!).getPropertyValue('--medium-footer-color').trim(), footerColor);
  });
});
