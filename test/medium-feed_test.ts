
import { MediumFeedElement } from '../src/feed/medium-feed.js';

import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('medium-feed', () => {

  test('is defined', () => {
    const el = document.createElement('medium-feed');
    assert.instanceOf(el, MediumFeedElement);
  });

  test('gets articles from rss feed', async () => {
    throw new Error('todo bg');
  });

  test('renders a collection of cards', async () => {
    throw new Error('todo bg');
  });

  test('trims article content to reasonable length', async () => {
    throw new Error('todo bg');
  });

  test('passes css variables to medium card', async () => {
    throw new Error('todo bg');
  });
});
