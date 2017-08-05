// @flow
import { mutateValBy, clamp } from './utils';
import type { Rgba, Point } from './gene';

export default function Gene (vertices: number, rgba?: number[], points?: Point[]) {
  this.rgba = rgba || this.generateRgba();
  this.points = points || this.generatePoints();
  this.vertices = vertices || 3; // defaults to using triangles
}

Gene.prototype.mutateColors = function (mutateChance: number, mutateAmount: number) {
  for (let i = 0; i < this.length; i++) {
    if (Math.random() < mutateChance) {
      this.values[i] = clamp(0, 255, this.values[i] + mutateValBy(mutateAmount));
    }
  }
};

Gene.prototype.generateRgba = function (): number[] {
  return [
    Math.random() * 255,
    Math.random() * 255,
    Math.random() * 255,
    Math.random(),
  ];
};

Gene.prototype.generatePoints = function() {

};
