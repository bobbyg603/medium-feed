---
layout: example.11ty.cjs
title: <medium-feed> ⌲ Examples ⌲ CSS Variables
tags: example
name: CSS Variables
description: Setting css variables
---

<h3>CSS</h3>

```css
medium-feed {
    --medium-feed-card-border: 3px solid lightgray;
    --medium-feed-card-header-color: white;
    --medium-feed-card-body-color: white;
    --medium-feed-card-footer-color: lightgray;
    --medium-feed-card-background-color: black;
}
```

<h3>HTML</h3>

```html
<medium-feed name="https://bobbyg603.medium.com/feed" count=3></medium-feed>
```

<h3>RESULT</h3>

<style>
medium-feed {
    --medium-feed-card-border: 3px solid lightgray;
    --medium-feed-card-header-color: white;
    --medium-feed-card-body-color: white;
    --medium-feed-card-footer-color: lightgray;
    --medium-feed-card-background-color: black;
    --medium-feed-card-border-radius: 10px;
}
</style>
<medium-feed url="https://bobbyg603.medium.com/feed" count=3></medium-feed>
