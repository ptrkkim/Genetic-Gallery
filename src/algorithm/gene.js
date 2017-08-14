// @flow
/* eslint class-methods-use-this: 0 */
import { mutateValBy, clamp } from './utils';

type Point = {
  x: number,
  y: number
};

export const minAlpha = 0.2;
export const canvasDim = 10; // later, import from canvas dimesion definition

export class Gene {
  numVertices: number;
  rgba: number[];
  points: Point[];

  constructor (numVertices: number = 3, rgba?: number[], points?: Point[]) {
    this.numVertices = numVertices; // defaults to using triangles
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

    return Array(this.numVertices).fill('').map(() => {
      const newX = xOrigin + ((Math.random() - 0.5) * canvasDim);
      const newY = yOrigin + ((Math.random() - 0.5) * canvasDim);
      const thisX = clamp(0, canvasDim, newX);
      const thisY = clamp(0, canvasDim, newY);
      return { x: thisX, y: thisY };
    });
  }

  mutateRgba (mutateChance: number, mutPercent: number) {
    const multiplier = 255;
    const rgbMutateAmount = multiplier * mutPercent; // rgb is range(0, 255)
    const aMutateAmount = mutPercent; // alpha is range(0, 1)
    if (Math.random() < mutateChance) {
      for (let i = 0; i < 3; i++) { // mutate RGB
        this.rgba[i] = clamp(0, 255, Math.round(mutateValBy(this.rgba[i], rgbMutateAmount)));
      }
      this.rgba[3] = clamp(0, 1, mutateValBy(this.rgba[3], aMutateAmount)); // mutate alpha
    }
  }

  mutatePoints (mutateChance: number, mutPercent: number) {
    const multiplier = canvasDim;
    const mutateAmount = multiplier * mutPercent;
    for (let i = 0; i < this.numVertices; i++) {
      if (Math.random() < mutateChance) {
        const newX = clamp(0, canvasDim, mutateValBy(this.points[i].x, mutateAmount));
        const newY = clamp(0, canvasDim, mutateValBy(this.points[i].y, mutateAmount));
        this.points[i].x = newX;
        this.points[i].y = newY;
      }
    }
  }
}
