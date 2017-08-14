// @flow
import { Individual } from './individual';

export class Population {
  individuals: Individual[];
  fitnesses: number[];
  polygonsPer: number;
  numVertices: number;
  crossoverChance: number;
  mutateChance: number;
  mutateAmount: number;

  constructor (
    size: number,
    polygonsPer: number,
    numVertices: number,
    crossoverChance: number,
    mutateChance: number,
    mutateAmount: number,
  ) {
    this.polygonsPer = polygonsPer;
    this.numVertices = numVertices;
    this.crossoverChance = crossoverChance;
    this.mutateChance = mutateChance;
    this.mutateAmount = mutateAmount;
    this.individuals = this.initialize(size);
    this.fitnesses = this.getAllFitnesses();
  }

  initialize (size: number): Individual[] {
    return Array(size).fill(null)
      .map(() => new Individual(this.polygonsPer, this.numVertices));
  }

  getAllFitnesses (): number[] {
    return this.individuals.map(individual => individual.fitness);
  }

  createNextGen () {

  }

  rouletteSelect (): Individual {
    const fitnessSum = this.fitnesses.reduce((sum, fitness) => sum + fitness, 0);
    let roll = Math.random() * fitnessSum;

    for (let i = 0; i < this.individuals.length; i++) {
      if (roll < this.fitnesses[i]) return this.individuals[i];
      roll -= this.fitnesses[i];
    }
    return this.individuals[0]; // should mathematically not reach here- for type safety only
  }

  crossover (mom: Individual, dad: Individual): Individual {
    const childGenes = [];
    for (let i = 0; i < mom.dna.length; i++) {
      Math.random() < 0.5
        ? childGenes.push(mom.dna[i])
        : childGenes.push(dad.dna[i]);
    }
    return new Individual(this.polygonsPer, this.numVertices, childGenes);
  }

  // runs in linear time, rather than n log n from having to sort
  getFittest (): Individual {
    const fittestIndex = this.fitnesses.reduce((fittestInd, currentScore, i, scores) => {
      if (currentScore > scores[fittestInd]) return i;
      return fittestInd;
    }, 0);

    return this.individuals[fittestIndex];
  }
}
