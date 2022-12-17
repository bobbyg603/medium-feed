
import { MediumFeedElement } from '../src/feed/medium-feed.js';
import { assert, fixture, html, waitUntil } from '@open-wc/testing';
import { article } from './article';
import sinon from 'sinon';
import { MediumCardElement } from '../src/index.js';

suite('medium-feed', () => {
  const url = '🔗';
  const cards = 3;
  let stubbedFetch: sinon.SinonStub;

  setup(() => {
    const response = createFakeResponse(cards);
    stubbedFetch = sinon.stub(globalThis, 'fetch');
    stubbedFetch.returns(Promise.resolve(response));
  });

  teardown(() => {
    stubbedFetch.restore();
  });

  test('is defined', () => {
    const el = document.createElement('medium-feed');
    assert.instanceOf(el, MediumFeedElement);
  });

  test('gets articles from rss feed', async () => {
    const el = await fixture(html`<medium-feed .url="${url}"></medium-feed>`) as MediumFeedElement;
    await el.updateComplete;
    assert.isTrue(stubbedFetch.calledWith(`https://api.rss2json.com/v1/api.json?rss_url=${url}`));
  });

  test('renders a collection of cards', async () => {
    const el = await fixture(html`<medium-feed .url="${url}"></medium-feed>`) as MediumFeedElement;
    await el.updateComplete;
    await waitUntil(
      () => el.shadowRoot?.querySelectorAll('medium-card').length === cards,
      'Element did not render children',
    );
    assert.equal(el.shadowRoot?.querySelectorAll('medium-card').length, cards);
  });

  test('sets all card properties', async () => {
    const el = await fixture(html`<medium-feed .url="${url}"></medium-feed>`) as MediumFeedElement;
    await el.updateComplete;
    await waitUntil(
      () => el.shadowRoot?.querySelectorAll('medium-card').length === cards,
      'Element did not render children',
    );
    const firstCard = el.shadowRoot?.querySelector('medium-card') as MediumCardElement;
    assert.equal(firstCard?.thumbnail, article.thumbnail);
    assert.equal(firstCard?.header, article.title);
    assert.equal(firstCard?.subheader, article.author);
    assert.isNotEmpty(firstCard?.body);
    assert.isNotEmpty(firstCard?.footer);
  });

  test('trims card body to reasonable length', async () => {
    const el = await fixture(html`<medium-feed .url="${url}"></medium-feed>`) as MediumFeedElement;
    await el.updateComplete;
    await waitUntil(
      () => el.shadowRoot?.querySelectorAll('medium-card').length === cards,
      'Element did not render children',
    );
    const firstCard = el.shadowRoot?.querySelector('medium-card') as MediumCardElement;
    const words = firstCard?.body.split(' ');
    assert.isTrue(words!.length <= 32);
  });

  test('creates footer from categories', async () => {
    const el = await fixture(html`<medium-feed .url="${url}"></medium-feed>`) as MediumFeedElement;
    await el.updateComplete;
    await waitUntil(
      () => el.shadowRoot?.querySelectorAll('medium-card').length === cards,
      'Element did not render children',
    );
    const firstCard = el.shadowRoot?.querySelector('medium-card') as MediumCardElement;
    assert.equal(firstCard?.footer, article.categories.join(' '));
  });

  test('passes css variables to medium card', async () => {
    const backgroundColor = 'rgb(255, 0, 0)';
    const borderColor = 'rgb(255, 165, 0)';
    const border = `3px solid ${borderColor}`;
    const borderRadius = '10px';
    const height = '100px';
    const headerColor = 'yellow';
    const bodyColor = 'green';
    const footerColor = 'blue';
    const style = `--medium-feed-card-height: ${height};`
      + `--medium-feed-card-background-color: ${backgroundColor};`
      + `--medium-feed-card-border: ${border};`
      + `--medium-feed-card-border-radius: ${borderRadius};`
      + `--medium-feed-card-header-color: ${headerColor};`
      + `--medium-feed-card-body-color: ${bodyColor};`
      + `--medium-feed-card-footer-color: ${footerColor}`;
    const el = await fixture(html`<medium-feed .url="${url}" style="${style}"></medium-feed>`) as MediumFeedElement;
    await el.updateComplete;
    await waitUntil(
      () => el.shadowRoot?.querySelectorAll('medium-card').length === cards,
      'Element did not render children',
    );
    const cardElement = el.shadowRoot?.querySelector('medium-card');
    const thumbnailElement = cardElement?.shadowRoot?.querySelector('medium-card-thumbnail');
    const headerElement = cardElement?.shadowRoot?.querySelector('medium-card-header');
    const bodyElement = cardElement?.shadowRoot?.querySelector('medium-card-body');
    const footerElement = cardElement?.shadowRoot?.querySelector('medium-card-footer');
    assert.equal(getComputedStyle(cardElement!).backgroundColor, backgroundColor);
    assert.equal(getComputedStyle(cardElement!).border, border);
    assert.equal(getComputedStyle(thumbnailElement!).getPropertyValue('--medium-thumbnail-height').trim(), height);
    assert.equal(getComputedStyle(thumbnailElement!).getPropertyValue('--medium-thumbnail-border-left-radius').trim(), borderRadius);
    assert.equal(getComputedStyle(headerElement!).getPropertyValue('--medium-header-color').trim(), headerColor);
    assert.equal(getComputedStyle(bodyElement!).getPropertyValue('--medium-body-color').trim(), bodyColor);
    assert.equal(getComputedStyle(footerElement!).getPropertyValue('--medium-footer-color').trim(), footerColor);
  });

  function createFakeResponse(cards: number) {
    const items = Array.from(Array(cards)).map(() => article);
    return new Response(
      JSON.stringify({
        items
      })
    );
  }
});
