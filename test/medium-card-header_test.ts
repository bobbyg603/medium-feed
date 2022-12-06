
import { MediumCardHeaderElement } from '../src';
import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('medium-card-header', () => {
  test('is defined', () => {
    const el = document.createElement('medium-card-header');
    assert.instanceOf(el, MediumCardHeaderElement);
  });

  test('renders header in h2 tag', async () => {
    const header = '👶';
    const el = await fixture(html`<medium-card-header .header="${header}"></medium-card-header>`);
    assert.shadowDom.equal(
      el,
      `<h2>${header}</h2>
      <h3></h3>
      `
    );
  });

  test('renders subheader in h3 tag', async () => {
    const subheader = '👶';
    const el = await fixture(html`<medium-card-header .subheader="${subheader}"></medium-card-header>`);
    assert.shadowDom.equal(
      el,
      `<h2></h2>
      <h3>${subheader}</h3>
      `
    );
  });

  test('renders header with color from css variable', async () => {
    const color = 'rgb(0, 255, 0)';
    const style = `--medium-header-color: ${color}`;
    const el = (await fixture(html`<medium-card-header style="${style}"></medium-card-header>`)) as MediumCardHeaderElement;
    await el.updateComplete;
    assert.equal(getComputedStyle(el.shadowRoot!.querySelector('h2')!).color, color);
    assert.equal(getComputedStyle(el.shadowRoot!.querySelector('h3')!).color, color);
  });
});
