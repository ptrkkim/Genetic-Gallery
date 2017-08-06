import Gene, { maxAlpha } from '../gene';

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
        expect(nPolygon).toHaveProperty('vertices', i);
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
        expect(nPolygon).toHaveProperty('vertices', i);
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
      expect(testGene.rgba[3]).toBeGreaterThanOrEqual(0); // alpha value
      expect(testGene.rgba[3]).toBeLessThanOrEqual(maxAlpha);
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
});
