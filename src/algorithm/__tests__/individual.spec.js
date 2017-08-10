import { Gene } from '../gene';
import { Individual } from '../individual';

describe('Individuals', () => {
  const generateIndividualSpy = jest.spyOn(Individual.prototype, 'generate');
  const geneRgbaSpy = jest.spyOn(Gene.prototype, 'generateRgba');
  const genePointsSpy = jest.spyOn(Gene.prototype, 'generatePoints');
  let testImage;
  const numPolygons = 50;

  describe('can self-generate', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      testImage = new Individual(numPolygons);
    });

    test('using prototypical generate method to populate own dna', () => {
      expect(generateIndividualSpy).toHaveBeenCalledTimes(1);
    });

    test('with a property defining the number of polygons in the image', () => {
      expect(testImage).toHaveProperty('numPolygons', numPolygons);
    });

    test('defaulting to using triangles', () => {
      expect(testImage).toHaveProperty('verticesPerPolygon', 3);
    });

    test('with as many genes as number of polygons', () => {
      expect(testImage).toHaveProperty('dna');
      expect(testImage.dna).toHaveLength(numPolygons);
      testImage.dna.forEach(gene => expect(gene).toBeInstanceOf(Gene));
    });

    test('have genes with randomly generated properties', () => {
      expect(geneRgbaSpy).toHaveBeenCalledTimes(numPolygons);
      expect(genePointsSpy).toHaveBeenCalledTimes(numPolygons);
    });
  });

  describe('initialize when passed a dna value', () => {
    const numVertices = 5;
    beforeEach(() => {
      const dna50 = Array(numPolygons).fill('').map(() => new Gene(numVertices));
      jest.clearAllMocks();
      testImage = new Individual(numPolygons, numVertices, dna50);
    });

    test('without calling the prototypical generate method', () => {
      expect(generateIndividualSpy).not.toHaveBeenCalled();
      expect(geneRgbaSpy).not.toHaveBeenCalled();
      expect(genePointsSpy).not.toHaveBeenCalled();
    });

    test('using the correct n-polygon', () => {
      for (let i = 3; i < 10; i++) {
        const nPolygonIndividual = new Individual(10, i);
        expect(nPolygonIndividual).toHaveProperty('verticesPerPolygon', i);
      }
    });

    test('use polygons with as many vertices as specified', () => {
      testImage.dna.forEach(gene => expect(gene.numVertices).toBe(numVertices));
      testImage.dna.forEach(gene => expect(gene.points).toHaveLength(numVertices));
    });

    test('with as many genes as there are in the dna passed to it', () => {
      expect(testImage).toHaveProperty('numPolygons', numPolygons);
      expect(testImage.dna).toHaveLength(numPolygons);
    });
  });

  describe('mutate', () => {

  });

  describe('calculate their fitness', () => {

  });
});
