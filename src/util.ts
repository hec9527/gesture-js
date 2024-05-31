import type { Point, TouchPoint } from './index';

export function getDistance(point1: Point | TouchPoint, point2: Point | TouchPoint): number {
  let p1x = 'clientX' in point1 ? point1.clientX : point1.x;
  let p1y = 'clientY' in point1 ? point1.clientY : point1.y;
  let p2x = 'clientX' in point2 ? point2.clientX : point2.x;
  let p2y = 'clientY' in point2 ? point2.clientY : point2.y;

  return Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2));
}

// export function getDistanceFromPoint(point1: Point, point2: Point) {
//   return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
// }

export function getCenter(point1: TouchPoint, point2: TouchPoint) {
  return {
    x: (point1.clientX + point2.clientX) / 2,
    y: (point1.clientY + point2.clientY) / 2,
  };
}
