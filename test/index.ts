import Gesture from '../src/index';

const app = document.getElementById('app')!;

const gesture = new Gesture(app);

gesture.on('slide', e => {
  console.log('slide', e);
  const { x, y } = e.detail;
  app.innerHTML += `<br/>slide x:${x} y:${y}`;
});

gesture.on('wheel', e => {
  console.log('wheel', e);
  app.innerHTML += `<br/>wheel - ${e.detail.type}`;
});

gesture.on('zoom', e => {
  console.log('zoom', e);
  app.innerHTML += `<br/>zoom - ${e.detail.type} ${e.detail.zoom}`;
});

gesture.on('end', e => {
  console.log('%c cancel', 'color:red', e);
  app.innerHTML += '<br/>gesture end';
});

gesture.on('start', e => {
  app.innerHTML = 'gesture start';
});
