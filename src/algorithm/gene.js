// @flow
import { mutateValBy, clamp } from './utils';
import type { Point } from './gene';

export default function Gene (vertices: number = 3, rgba?: number[], points?: Point[]) {
  this.vertices = vertices; // defaults to using triangles
  this.rgba = rgba || this.generateRgba();
  this.points = points || this.generatePoints();
}

Gene.prototype.mutateColors = function (mutateChance: number, mutateAmount: number) {
  for (let i = 0; i < this.length; i++) {
    if (Math.random() < mutateChance) {
      this.rgba[i] = clamp(0, 255, mutateValBy(this.rgba[i], mutateAmount));
    }
  }
};

Gene.prototype.generateRgba = function (): number[] {
  return [
    Math.random() * 255,
    Math.random() * 255,
    Math.random() * 255,
    Math.max(Math.random() * Math.random(), 0.2),
  ];
};

Gene.prototype.generatePoints = function(): Point[] {
  const xOrigin = Math.random();
  const yOrigin = Math.random();

  return Array(this.vertices).fill('').map(() => {
    const thisX = xOrigin + (Math.random() - 0.5);
    const thisY = yOrigin + (Math.random() - 0.5);
    return { x: thisX, y: thisY };
  });
};
