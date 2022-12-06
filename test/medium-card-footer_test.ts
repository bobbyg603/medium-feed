
import { MediumCardFooterElement } from '../src';
import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('medium-card-footer', () => {
  test('is defined', () => {
    const el = document.createElement('medium-card-footer');
    assert.instanceOf(el, MediumCardFooterElement);
  });

  test('renders footer test', async () => {
    const footer = '🐾';
    const el = await fixture(html`<medium-card-footer .footer="${footer}"></medium-card-footer>`);
    assert.shadowDom.equal(
      el,
      footer
    );
  });

  test('renders footer with color from css variable', async () => {
    const color = 'rgb(0, 100, 0)';
    const style = `--medium-footer-color: ${color}`;
    const el = (await fixture(html`<medium-card-footer style="${style}"></medium-card-footer>`)) as MediumCardFooterElement;
    await el.updateComplete;
    assert.equal(getComputedStyle(el).color, color);
  });
});
