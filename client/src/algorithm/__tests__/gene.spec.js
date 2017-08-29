import { Gene, minAlpha } from '../gene';

const compareArr = (arr1, arr2) => arr1.reduce((bool, e, i) => {
  const same = arr1[i] === arr2[i];
  return bool && same;
}, true);

describe('Genes', () => {
  const rgbaSpy = jest.spyOn(Gene.prototype, 'generateRgba');
  const pointSpy = jest.spyOn(Gene.prototype, 'generatePoints');

  describe('initialize correctly when passed rgba and point values', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('with property `vertices`, the number of points in the polygon', () => {
      for (let i = 3; i <= 10; i++) {
        const nPolygon = new Gene(i);
        expect(nPolygon).toHaveProperty('numVertices', i);
        expect(nPolygon).toHaveProperty('points');
        expect(nPolygon.points).toHaveLength(i);
      }
    });

    test('with property `points`, an array of each vertex of the polygon', () => {
      for (let i = 3; i <= 10; i++) {
        const seedPoints = [];
        for (let j = 0; j < i; j++) {
          seedPoints.push({ x: j, y: j });
        }

        const dummyRgba = [0, 0, 0, 0];
        const nPolygon = new Gene(i, dummyRgba, seedPoints);
        expect(nPolygon).toHaveProperty('numVertices', i);
        expect(nPolygon).toHaveProperty('points', seedPoints);
        expect(nPolygon.points).toHaveLength(i);
      }
    });

    test('with property `rgba`, an array of valid rgba values', () => {
      for (let i = 0; i < 1000; i++) {
        const r = Math.random() * 255;
        const g = Math.random() * 255;
        const b = Math.random() * 255;
        const a = Math.random();
        const rgba = [r, g, b, a];
        const testGene = new Gene(3, rgba);
        expect(testGene).toBeInstanceOf(Gene);
        expect(testGene).toHaveProperty('rgba', [r, g, b, a]);
      }
    });
  });

  describe('initialize correctly when passed no values', () => {
    let testGene;
    const trueRandom = Math.random;

    beforeEach(() => {
      jest.clearAllMocks();
      Math.random = trueRandom;
      testGene = new Gene();
    });

    test('and generates random RGB values to fill the polygon', () => {
      expect(rgbaSpy).toHaveBeenCalledTimes(1);
      for (let i = 0; i < 3; i++) {
        expect(testGene.rgba[i]).toBeGreaterThanOrEqual(0);
        expect(testGene.rgba[i]).toBeLessThanOrEqual(255);
      }
    });

    test('and generates a random alpha value defining opacity', () => {
      expect(testGene.rgba[3]).toBeGreaterThanOrEqual(minAlpha); // alpha value
      expect(testGene.rgba[3]).toBeLessThanOrEqual(1);
    });

    // this is not a great test. too lenient with ranges
    // maybe rewrite mocking extreme math.random values later
    // will be difficult, as generateRgba uses random during construction as well
    test('and generates random points defining its vertices', () => {
      expect(pointSpy).toHaveBeenCalledTimes(1);
      expect(testGene.points).toHaveLength(3);

      const checkAxes = (axis, index) => {
        expect(testGene.points[index][axis]).toBeGreaterThanOrEqual(-0.5);
        expect(testGene.points[index][axis]).toBeLessThanOrEqual(1.5);
      };

      for (let i = 0; i < 3; i++) {
        Object.keys(testGene.points[i]).forEach(checkAxes);
      }
    });
  });

  describe('mutate', () => {
    const blackFill = [0, 0, 0, 0.5];
    const whiteFill = [255, 255, 255, 0.5];
    const testPoints = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    const numTestGenes = 50;
    let testBlack;
    let testWhite;

    const clone = arr => arr.map(obj => Object.assign({}, obj));
    beforeEach(() => {
      testBlack = Array(numTestGenes).fill('').map(() => new Gene(3, blackFill.slice(), clone(testPoints)));
      testWhite = Array(numTestGenes).fill('').map(() => new Gene(3, whiteFill.slice(), clone(testPoints)));
    });

    describe('their colors properly', () => {
      test('mutates rgba property on gene instance', () => {
        for (let i = 0; i < numTestGenes; i++) {
          expect(testBlack[i]).toHaveProperty('rgba', blackFill);
          expect(testWhite[i]).toHaveProperty('rgba', whiteFill);

          testBlack[i].mutateRgba(1, 0.1);
          testWhite[i].mutateRgba(1, 0.1);

          expect(testBlack[i].rgba).not.toEqual(blackFill);
          expect(testWhite[i].rgba).not.toEqual(whiteFill);
        }
      });

      test('mutates rgba values in-bounds', () => {
        testBlack.forEach(gene => expect(gene.rgba).toEqual(blackFill));
      });
    });

    describe('their points properly', () => {
      test('maintains number of vertices', () => {
        testBlack.forEach(gene => expect(gene.points).toHaveLength(testPoints.length));
        testWhite.forEach(gene => expect(gene.points).toHaveLength(testPoints.length));
      });

      test('mutates points property on gene instance', () => {
        for (let i = 0; i < numTestGenes; i++) {
          expect(testWhite[i]).toHaveProperty('points', testPoints);
          expect(testBlack[i]).toHaveProperty('points', testPoints);
          testBlack[i].mutatePoints(1, 0.1);
          testWhite[i].mutatePoints(1, 0.1);
        }
        const blkArrMutated = testBlack.some(gene => !compareArr(gene.points, testPoints));
        const whtArrMutated = testWhite.some(gene => !compareArr(gene.points, testPoints));
        expect(blkArrMutated).toBe(true);
        expect(whtArrMutated).toBe(true);
      });
    });
  });
});
