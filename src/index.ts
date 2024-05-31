import * as util from './util';

export type Gestures = 'slide' | 'wheel' | 'zoom';

export type GesturesEvent = Gestures | 'end' | 'start';

export type EventMap = {
  [key in GesturesEvent]?: Function[];
};

export type Point = {
  x: number;
  y: number;
};

export type TouchPoint = TouchList[number];

export type ZoomEvent = CustomEvent<{ zoom: number; type: 'zoomIn' | 'zoomOut' }>;

export type SlideEvent = CustomEvent<{ x: number; y: number }>;

export type WheelEvent = CustomEvent<{ type: 'wheelDown' | 'wheelUp' }>;

type CallbackFunction<T> = (event: T) => void;

export default class Gesture {
  private el: HTMLElement;

  private events: EventMap = {};

  private touchCenter: Point = { x: 0, y: 0 };

  private touchDistance: number = 0;

  private isEnd: boolean = false;

  constructor(el?: HTMLElement) {
    this.el = el || document.documentElement;
    this.initEvent();
  }

  private initEvent() {
    this.el.addEventListener('touchstart', event => {
      if (event.touches.length < 2) return;
      const p0 = event.touches[0];
      const p1 = event.touches[1];

      this.emit('start', event);

      this.isEnd = false;
      this.touchDistance = util.getDistance(p0, p1);
      this.touchCenter = util.getCenter(p0, p1);
    });

    this.el.addEventListener('touchmove', event => {
      if (event.touches.length < 2 || this.isEnd) return;
      event.preventDefault();
      event.stopPropagation();

      const touchDistance = util.getDistance(event.touches[0], event.touches[1]);

      // zoom
      this.emit(
        // touchDistance > this.touchDistance ? 'zoomIn' : 'zoomOut',
        'zoom',
        new CustomEvent('zoom', {
          detail: {
            type: touchDistance > this.touchDistance ? 'zoomIn' : 'zoomOut',
            zoom: +(touchDistance / this.touchDistance).toFixed(2),
          },
        })
      );

      // slide
      const touchCenter = util.getCenter(event.touches[0], event.touches[1]);

      this.emit(
        'slide',
        new CustomEvent('slide', {
          detail: {
            x: touchCenter.x - this.touchCenter.x,
            y: touchCenter.y - this.touchCenter.y,
          },
        })
      );

      // this.touchCenter = touchCenter;
      // this.touchDistance = touchDistance;
    });

    this.el.addEventListener('touchend', event => {
      if (event.touches.length < 2 && !this.isEnd) {
        this.emit('end', event);
        this.isEnd = true;
      }
    });

    this.el.addEventListener('wheel', event => {
      event.preventDefault();
      event.stopPropagation();

      this.emit(
        'wheel',
        new CustomEvent('wheel', {
          detail: {
            type: event.deltaY > 0 ? 'wheelDown' : 'wheelUp',
          },
        })
      );
    });
  }

  private emit(type: GesturesEvent, event: Event) {
    this.events[type]?.forEach(cb => cb(event));
  }

  on(type: 'end', callback: CallbackFunction<Event>): void;
  on(type: 'start', callback: CallbackFunction<Event>): void;
  on(type: 'slide', callback: CallbackFunction<SlideEvent>): void;
  on(type: 'wheel', callback: CallbackFunction<WheelEvent>): void;
  on(type: 'zoom', callback: CallbackFunction<ZoomEvent>): void;
  on(type: GesturesEvent, callback: Function) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type]!.push(callback);
  }
}
