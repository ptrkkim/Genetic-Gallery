import { Population } from '../population';
import { Individual } from '../individual';
import { Gene } from '../gene';

describe('A population', () => {
  describe('can self-populate the first generation of images', () => {
    const popSize = 10;
    const polygonsPerImage = 50;
    const verticesPerPolygon = 3;
    const crossoverChance = 1;
    const mutateChance = 1;
    const mutateAmount = 0.1;
    let generationZero;

    beforeEach(() => {
      generationZero = new Population(
        popSize,
        polygonsPerImage,
        verticesPerPolygon,
        crossoverChance,
        mutateChance,
        mutateAmount,
      );
    });

    test('with the correct size', () => {
      expect(generationZero.individuals).toHaveLength(popSize);
    });

    test('with the correct number of genes per individual', () => {
      generationZero.individuals.forEach((individual) => {
        expect(individual).toBeInstanceOf(Individual);
        expect(individual).toHaveProperty('numPolygons', polygonsPerImage);
        expect(individual.dna).toHaveLength(polygonsPerImage);
      });
    });

    test('with the correct shape of polygon', () => {
      generationZero.individuals.forEach((individual) => {
        individual.dna.forEach((gene) => {
          expect(gene).toBeInstanceOf(Gene);
          expect(gene).toHaveProperty('numVertices', verticesPerPolygon);
          expect(gene).toHaveProperty('points');
          expect(gene.points).toHaveLength(verticesPerPolygon);
        });
      });
    });

    test('with parameters for use during mutation', () => {
      expect(generationZero).toHaveProperty('mutateChance', mutateChance);
      expect(generationZero).toHaveProperty('mutateAmount', mutateAmount);
    });
  });

  describe('can evolve', () => {
    // cannot be tested until I decide how I am passing canvas references to population
  });
});

