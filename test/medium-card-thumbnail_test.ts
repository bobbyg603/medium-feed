
import { MediumCardThumbnailElement } from '../src';
import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('medium-card-thumbnail', () => {
  test('is defined', () => {
    const el = document.createElement('medium-card-thumbnail');
    assert.instanceOf(el, MediumCardThumbnailElement);
  });

  test('renders img with src', async () => {
    const src = 'https://newayz.net';
    const el = await fixture(html`<medium-card-thumbnail .src="${src}"></medium-card-thumbnail>`);
    assert.shadowDom.equal(
      el,
      `<img src="${src}">`
    );
  });

  test('renders img with height, width, and corner radius from css variables', async () => {
    const height = '100px';
    const width = '200px';
    const borderLeftRadius = '10px';
    const borderRightRadius = '0px';
    const style = `--medium-thumbnail-height: ${height};`
      + `--medium-thumbnail-width: ${width};`
      + `--medium-thumbnail-border-left-radius: ${borderLeftRadius};`
      + `--medium-thumbnail-border-right-radius: ${borderRightRadius};`;
    const el = (await fixture(html`<medium-card-thumbnail style="${style}"></medium-card-thumbnail>`)) as MediumCardThumbnailElement;
    await el.updateComplete;
    const img = el.shadowRoot!.querySelector('img')!;
    assert.equal(getComputedStyle(img).height, height);
    assert.equal(getComputedStyle(img).width, width);
    assert.equal(getComputedStyle(img).borderTopLeftRadius, borderLeftRadius);
    assert.equal(getComputedStyle(img).borderBottomLeftRadius, borderLeftRadius);
    assert.equal(getComputedStyle(img).borderTopRightRadius, borderRightRadius);
    assert.equal(getComputedStyle(img).borderBottomRightRadius, borderRightRadius);
  });
});
