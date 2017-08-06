import Gene from '../gene';

describe('Genes', () => {
  describe('initialize correctly when passed rgba and point values', () => {
    test('has property `vertices`, the number of points in the polygon', () => {
      for (let i = 3; i <= 10; i++) {
        const nPolygon = new Gene(i);
        expect(nPolygon).toHaveProperty('vertices', i);
        expect(nPolygon).toHaveProperty('points');
        expect(nPolygon.points).toHaveLength(i);
      }
    });

    test('has property `rgba`, an array of valid rgba values', () => {
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

  });
});
