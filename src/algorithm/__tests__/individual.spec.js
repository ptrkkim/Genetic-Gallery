import { Gene } from '../gene';
import { Individual } from '../individual';

describe('Individuals', () => {
  const generateSpy = jest.spyOn(Individual.prototype, 'generate');
  const geneRgbaSpy = jest.spyOn(Gene.prototype, 'generateRgba');
  const genePointsSpy = jest.spyOn(Gene.prototype, 'generatePoints');

  describe('can self-generate', () => {
    const numPolygons = 50;
    const testImage = new Individual(numPolygons);

    test('using prototypical generate method to populate own dna', () => {
      expect(generateSpy).toHaveBeenCalledTimes(1);
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

  });

  describe('mutate', () => {

  });

  describe('calculate their fitness', () => {

  });
});
