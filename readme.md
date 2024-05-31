# Gesture

`Gesture` is a TypeScript library for detecting various gestures such as swipes, wheel movements, and pinches. It provides comprehensive TypeScript type definitions for an enhanced development experience in modern front-end projects.

## Features

- **Slide Gestures**: Detect horizontal and vertical slide.
- **Wheel Gestures**: Detect mouse wheel events.
- **Pinch Gestures**: Detect pinch gestures with two fingers.
- **TypeScript Types**: Full TypeScript type definitions for better development experience.

## Installation

Install via npm:

```bash
npm install @hec9527/gesture-js
```


## Use

```ts
import Gesture from '@hec9527/gesture-js';

const element = document.getElementById('app');

const gesture = new Gesture(element);

// Listen for swipe gestures
gesture.on('slide', (event) => {
  console.log(`slide ${event.detail.x} with velocity ${event.detail.y}`);
});

// Listen for wheel gestures
gesture.on('wheel', (event) => {
  console.log(`Wheel delta: ${event.detail.type}`);
});

// Listen for pinch gestures
gesture.on('zoom', (event) => {
  console.log(`Pinched with scale ${event.detail.zoom}`);
});
```