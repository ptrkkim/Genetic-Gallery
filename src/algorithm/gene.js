// @flow
/* eslint class-methods-use-this: 0 */
import { mutateValBy, clamp } from './utils';
import type { Point } from './geneTypes';

export const minAlpha = 0.2;
export const canvasDim = 75; // later, import from canvas dimesion definition

export class Gene {
  numVertices: number;
  rgba: number[];
  points: Point[];

  constructor (vertices: number = 3, rgba?: number[], points?: Point[]) {
    this.numVertices = vertices; // defaults to using triangles
    this.rgba = rgba || this.generateRgba();
    this.points = points || this.generatePoints();
  }

  generateRgba (): number[] {
    return [
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.max(Math.random() * Math.random(), minAlpha),
    ];
  }

  generatePoints (): Point[] {
    const xOrigin = Math.random() * canvasDim;
    const yOrigin = Math.random() * canvasDim;

    return Array(this.vertices).fill('').map(() => {
      const thisX = xOrigin + ((Math.random() - 0.5) * canvasDim);
      const thisY = yOrigin + ((Math.random() - 0.5) * canvasDim);
      return { x: thisX, y: thisY };
    });
  }

  mutateColors (mutateChance: number, mutPercent: number) {
    const multiplier = 255;
    const rgbMutateAmount = multiplier * mutPercent; // rgb is range(0, 255)
    const aMutateAmount = mutPercent; // alpha is range(0, 1)
    for (let i = 0; i < 3; i++) { // mutate RGB
      if (Math.random() < mutateChance) {
        this.rgba[i] = clamp(0, 255, Math.round(mutateValBy(this.rgba[i], rgbMutateAmount)));
      }
    }
    this.rgba[3] = clamp(0, 1, mutateValBy(this.rgba[3], aMutateAmount)); // mutate alpha
  }

  mutatePoints (mutateChance: number, mutPercent: number) {
    const multiplier = canvasDim;
    const mutateAmount = multiplier * mutPercent;
    for (let i = 0; i < this.vertices; i++) {
      if (Math.random() < mutateChance) {
        const newX = clamp(0, canvasDim, mutateValBy(this.points[i].x, mutateAmount));
        const newY = clamp(0, canvasDim, mutateValBy(this.points[i].y, mutateAmount));
        this.points[i].x = newX;
        this.points[i].y = newY;
      }
    }
  }
}
