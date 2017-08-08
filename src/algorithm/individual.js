// @flow
import { Gene } from './gene';
import type { GeneT } from './geneTypes';
// a single image, or collection of genes/polygons
function Individual (dna: GeneT[], polygons: number, vertices?: number) {
  this.verticesPerPolygon = vertices;
  this.dna = dna || this.generate(polygons);
}

Individual.prototype.generate = function (numPolygons: number): GeneT[] {
  const polygonsInImage = [];
  for (let i = 0; i < numPolygons; i++) {
    polygonsInImage.push(new Gene(this.verticesPerPolygon));
  }
  return polygonsInImage;
};

Individual.prototype.mutate = function (mutateChance: number): void {
  for (let i = 0; i < this.dna.length; i++) {
    this.dna[i].mutate(mutateChance);
  }
};

Individual.prototype.getFitness = function () {

};
