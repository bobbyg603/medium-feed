---
layout: page.11ty.cjs
title: <medium-feed> ⌲ Home
---

# &lt;medium-feed>

`<medium-feed>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="rows">
  <div>

`<medium-feed>` is just an HTML element. You can it anywhere you can use HTML!

```html
<medium-feed url="https://bobbyg603.medium.com/feed" count=1></medium-feed>
```

  </div>
  <div>

<h2>This is a &lt;medium-feed&gt;</h2>
<medium-feed url="https://bobbyg603.medium.com/feed" count=1></medium-feed>

  </div>
</section>

## Declarative rendering

<section class="rows">
  <div>

`<medium-feed>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const url = 'https://bobbyg603.medium.com/feed';

render(
  html`
    <h2>This is a &lt;medium-feed&gt;</h2>
    <medium-feed .url=${url} count=3></medium-feed>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;medium-feed&gt;</h2>
<medium-feed url="https://bobbyg603.medium.com/feed" count=3></medium-feed>

  </div>
</section>
