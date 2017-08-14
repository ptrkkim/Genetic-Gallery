// @flow
import cloneDeep from 'lodash.clonedeep';
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
    this.fitnesses = this.getAllFitnesses(refCtx, fitCtx, canvasWH);
  }

  initialize (size: number): Individual[] {
    return Array(size).fill(null)
      .map(() => new Individual(this.polygonsPer, this.numVertices));
  }

  getAllFitnesses (refCtx: CanvasRenderingContext2D, fitCtx: CanvasRenderingContext2D, canvasWH: number): number[] {
    return this.individuals.map(individual => individual.calcFitness(refCtx, fitCtx, canvasWH));
  }

  createNextGen () {
    const evolvedPop = [];
    while (evolvedPop.length < this.individuals.length) {
      evolvedPop.push(this.haveChild());
    }
    this.individuals = evolvedPop;
    this.fitnesses = evolvedPop.getAllFitnesses(refCtx, fitCtx, canvasWH);
  }

  haveChild () {
    const mom = this.rouletteSelect();
    const dad = this.rouletteSelect();
    const parentToClone = Math.random() < 0.5 ? mom : dad;
    const possiblyCrossed = Math.random() < this.crossoverChance
      ? this.crossover(mom, dad)
      : cloneDeep(parentToClone);

    possiblyCrossed.mutate(this.mutateChance, this.mutateAmount);
    return possiblyCrossed;
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
