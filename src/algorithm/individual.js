// @flow
import { Gene } from './gene';
import { getPixels } from './utils';

// a single image, or collection of genes/polygons
export class Individual {
  numPolygons: number;
  verticesPerPolygon: number;
  fitness: number;
  dna: Gene[];

  constructor (polygons: number, vertices?: number, dna?: Gene[]) {
    this.numPolygons = polygons;
    this.verticesPerPolygon = vertices || 3;
    this.dna = dna || this.generate(polygons);
  }

  generate (numPolygons: number): Gene[] {
    const polygonsInImage = [];
    for (let i = 0; i < numPolygons; i++) {
      polygonsInImage.push(new Gene(this.verticesPerPolygon));
    }
    return polygonsInImage;
  }

  mutate (mutateChance: number, mutatePercentage: number): void {
    for (let i = 0; i < this.dna.length; i++) {
      this.dna[i].mutateRgba(mutateChance, mutatePercentage);
      this.dna[i].mutatePoints(mutateChance, mutatePercentage);
    }
  }

  draw(ctx: CanvasRenderingContext2D, resolution: number): void {
    for (let i = 0; i < this.numPolygons; i++) {
      const polygon = this.dna[i];
      const points = polygon.points;
      const numVertices = polygon.numVertices;
      const [red, blue, green, alpha] = polygon.rgba;
      const fillStyle = `rgba(${red}, ${blue}, ${green}, ${alpha})`;

      ctx.beginPath();
      ctx.moveTo(points[0].x * resolution, points[0].y * resolution);
      for (let j = 1; j < numVertices; j++) {
        ctx.lineTo(points[j].x * resolution, points[j].y * resolution);
      }
      ctx.closePath();

      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
  }
  // use sum of squared differences for pixel by pixel comparison
  // higher the difference, worse the fitness
  calcFitness (
    referenceCtx: CanvasRenderingContext2D,
    fitnessCtx: CanvasRenderingContext2D,
    resolution: number,
  ): number {
    if (!referenceCtx || !fitnessCtx) return 0; // placeholder until canvas logic done

    fitnessCtx.clearRect(0, 0, resolution, resolution);
    this.draw(fitnessCtx, resolution);
    const dimensions = resolution * resolution;
    const refData = getPixels(referenceCtx, resolution);
    const fitData = getPixels(fitnessCtx, resolution);
    let sumOfSquaredDiffs = 0;

    // use constant 4 b/c data looks like [r1, b1, g1, a1, r2, b2...]
    // finds pixel by pixel diff between two images
    // finally, takes sum of squared diffs as percentage of max possible diff
    for (let px = 0; px < dimensions * 4; px++) {
      sumOfSquaredDiffs += ((refData[px] - fitData[px]) ** 2);
    }

    return (1 - (sumOfSquaredDiffs / (dimensions * 4 * 256)));
  }
}
