import cloneDeep from 'lodash.clonedeep';
import { Gene } from '../gene';
import { Individual } from '../individual';

describe('Individuals', () => {
  const generateIndividualSpy = jest.spyOn(Individual.prototype, 'generate');
  const geneRgbaSpy = jest.spyOn(Gene.prototype, 'generateRgba');
  const genePointsSpy = jest.spyOn(Gene.prototype, 'generatePoints');
  let testImage;
  let numPolygons;
  let numVertices;

  describe('can self-generate', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      numPolygons = 50;
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
    beforeEach(() => {
      numVertices = 5;
      numPolygons = 50;
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
    const individualMutateSpy = jest.spyOn(Individual.prototype, 'mutate');
    const geneMutateRgbaSpy = jest.spyOn(Gene.prototype, 'mutateRgba');
    const geneMutatePointsSpy = jest.spyOn(Gene.prototype, 'mutatePoints');
    let mutateChance;
    let mutatePercentage;
    let originalDna;
    let testImageCopy;

    beforeEach(() => {
      numVertices = 5;
      numPolygons = 50;
      jest.clearAllMocks();
      originalDna = Array(numPolygons).fill('').map(() => new Gene(numVertices));
      testImage = new Individual(numPolygons, numVertices, originalDna);
      testImageCopy = cloneDeep(testImage);
    });

    test('using gene prototype methods mutateRgba and mutatePoints', () => {
      mutateChance = 1;
      mutatePercentage = 0.5;

      testImage.mutate(mutateChance, mutatePercentage);
      expect(individualMutateSpy).toHaveBeenCalledTimes(1);
      expect(geneMutateRgbaSpy).toHaveBeenCalledTimes(numPolygons);
      expect(geneMutatePointsSpy).toHaveBeenCalledTimes(numPolygons);
    });

    test('uses mutateChance to determine how often mutation will happen', () => {
      mutateChance = 0;
      mutatePercentage = 0.5;

      expect(testImage.dna).toEqual(testImageCopy.dna);
      testImage.mutate(mutateChance, mutatePercentage);
      expect(testImage.dna).toEqual(testImageCopy.dna);

      mutateChance = 1;
      testImage.mutate(mutateChance, mutatePercentage);
      expect(testImage.dna).not.toEqual(testImageCopy.dna);
    });

    test('uses mutatePercentage to determine how much to mutate values by', () => {
      mutateChance = 1;
      mutatePercentage = 0;

      expect(testImage.dna).toEqual(testImageCopy.dna);
      testImage.mutate(mutateChance, mutatePercentage);
      expect(testImage.dna).toEqual(testImageCopy.dna);

      mutatePercentage = 1;
      testImage.mutate(mutateChance, mutatePercentage);
      expect(testImage.dna).not.toEqual(testImageCopy.dna);
    });
  });

  describe('calculate their fitness', () => {
    const canvasWH = 10;
    const refCanvas = document.createElement('CANVAS');
    const refCtx = refCanvas.getContext('2d');
    refCtx.fillStyle = 'rgba(0, 0, 0, 1)'; // black opaque
    refCtx.fillRect(0, 0, canvasWH, canvasWH);

    let fitCanvas;
    let fitCtx;

    const makeSquareGenes = (rgbaArr, numGenes) => {
      const genes = [];
      for (let i = 0; i < numGenes; i++) {
        const rgba = rgbaArr.slice();
        const square = [
          { x: 0, y: 0 },
          { x: 0, y: canvasWH },
          { x: canvasWH, y: canvasWH },
          { x: canvasWH, y: 0 },
        ];
        genes.push(new Gene(4, rgba, square));
      }
      return genes;
    };

    test('exactly matching images have the max fitness of 1', () => {
      fitCanvas = document.createElement('canvas');
      fitCtx = fitCanvas.getContext('2d');

      const opaqueBlack = [0, 0, 0, 1];
      const testGenes = makeSquareGenes(opaqueBlack, 10);
      const testIndividual = new Individual(10, 4, testGenes);
      const fitness = testIndividual.calcFitness(refCtx, fitCtx, canvasWH);
      expect(fitness).toBe(1);
    });

    test('fitness decreases with increasing disparity from the reference', () => {
      const smallDiffCanvas = document.createElement('canvas');
      const smallDiffCtx = smallDiffCanvas.getContext('2d');

      const opaqueRed = [255, 0, 0, 1];
      const smallDiffGenes = makeSquareGenes(opaqueRed, 10);
      const bigDiffCanvas = document.createElement('canvas');
      const bigDiffCtx = bigDiffCanvas.getContext('2d');

      const opaquePurple = [255, 0, 255, 1]; // red + blue max
      const bigDiffGenes = makeSquareGenes(opaquePurple, 10);

      const smallDiffIndividual = new Individual(10, 4, smallDiffGenes); // red
      const bigDiffIndividual = new Individual(10, 4, bigDiffGenes); // red + blue
      const smallDiffFit = smallDiffIndividual.calcFitness(refCtx, smallDiffCtx, canvasWH);
      const bigDiffFit = bigDiffIndividual.calcFitness(refCtx, bigDiffCtx, canvasWH);
      expect(smallDiffFit).not.toBe(1);
      expect(bigDiffFit).not.toBe(1);
      expect(smallDiffFit).toBeGreaterThan(bigDiffFit);
    });

    test('using sum of squared differences', () => {

    });
  });

  describe('can draw themselves to a canvas', () => {

  });
});
