// @flow
import { Gene } from './gene';
import { getPixels } from './utils';
// import type { GeneT } from './geneTypes';

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
    this.fitness = this.calcFitness();
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
      this.dna[i].mutateColors(mutateChance, mutatePercentage);
      this.dna[i].mutatePoints(mutateChance, mutatePercentage);
    }
  }

  draw(ctx: *, width: number, height: number): void {
    for (let i = 0; i < this.numPolygons; i++) {
      const polygon = this.dna[i];
      const points = polygon.points;
      const numVertices = polygon.numVertices;
      const [red, blue, green, alpha] = polygon.rgba;
      const fillStyle = `rgba(${red},${blue},${green},${alpha})`;

      ctx.beginPath();
      ctx.moveTo(points[0].x * width, points[0].y * height);
      for (let j = 1; j < numVertices; i++) {
        ctx.lineTo(points[j].x, points[j].y);
      }
      ctx.closePath();
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
  }
  // use sum of squared differences for pixel by pixel comparison
  // higher the difference, worse the fitness
  calcFitness (referenceCanvas, fitnessCanvas): number {
    if (!referenceCanvas || !fitnessCanvas) return 0; // placeholder until canvas logic done

    const dimensions = fitnessCanvas.width * fitnessCanvas.height;
    const refData = getPixels(referenceCanvas);
    const fitData = getPixels(fitnessCanvas);
    let sumOfSquaredDiffs = 0;

    // use constant 4 b/c data looks like [r1, b1, g1, a1, r2, b2...]
    // finds pixel by pixel diff between two images
    // finally, takes sum of squared diffs as percentage of max possible diff
    for (let i = 0; i < dimensions * 4; i++) {
      sumOfSquaredDiffs += ((refData[i] - fitData[i]) ** 2);
    }
    return (1 - (sumOfSquaredDiffs / (dimensions * 4)));
  }
}
