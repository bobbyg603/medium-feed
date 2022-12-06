
import { MediumCardBodyElement } from '../src';
import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('medium-card-body', () => {
  test('is defined', () => {
    const el = document.createElement('medium-card-body');
    assert.instanceOf(el, MediumCardBodyElement);
  });

  test('renders with card body with body content', async () => {
    const body = '🧍';
    const el = await fixture(html`<medium-card-body .body="${body}"></medium-card-body>`);
    assert.shadowDom.equal(
      el,
      body
    );
  });

  test('renders card with color from css variable', async () => {
    const color = 'rgb(0, 128, 0)';
    const style = `--medium-body-color: ${color}`;
    const el = (await fixture(html`<medium-card-body style="${style}"></medium-card-body>`)) as MediumCardBodyElement;
    await el.updateComplete;
    assert.equal(getComputedStyle(el).color, color);
  });
});
