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
  refCtx: CanvasRenderingContext2D;
  fitCtx: CanvasRenderingContext2D;
  outCtx: CanvasRenderingContext2D;
  resolution: number;

  constructor (
    size: number,
    polygonsPer: number,
    numVertices: number,
    crossoverChance: number,
    mutateChance: number,
    mutateAmount: number,
    refCtx: CanvasRenderingContext2D,
    fitCtx: CanvasRenderingContext2D,
    outCtx: CanvasRenderingContext2D,
    resolution: number,
  ) {
    this.polygonsPer = polygonsPer;
    this.numVertices = numVertices;
    this.crossoverChance = crossoverChance;
    this.mutateChance = mutateChance;
    this.mutateAmount = mutateAmount;
    this.individuals = this.sortByFitness(this.initialize(size));
    this.refCtx = refCtx;
    this.fitCtx = fitCtx;
    this.outCtx = outCtx;
    this.resolution = resolution; // resolution for fitness calc
  }

  initialize (size: number): Individual[] {
    return Array(size).fill(null)
      .map(() => new Individual(this.polygonsPer, this.numVertices));
  }

  evolveNextGen (): void {
    const evolvedPop = [];
    while (evolvedPop.length < this.individuals.length) {
      evolvedPop.push(this.haveChild());
    }
    this.individuals = this.sortByFitness(evolvedPop);
  }

  sortByFitness (individuals: Individual[]): Individual[] {
    const compareFitness = (a, b) => {
      if (a.fitness < b.fitness) return 1;
      if (a.fitness > b.fitness) return -1;
      return 0;
    };

    return individuals.sort(compareFitness);
  }

  haveChild (): Individual {
    const cutoff = 0.2; // 20th percentile
    const mom = this.cutoffSelect(cutoff);
    const dad = this.cutoffSelect(cutoff);
    const parentToClone = Math.random() < 0.5 ? mom : dad;
    const child = Math.random() < this.crossoverChance
      ? this.crossover(mom, dad)
      : cloneDeep(parentToClone);

    child.mutate(this.mutateChance, this.mutateAmount);
    child.fitness = child.calcFitness(this.refCtx, this.fitCtx, this.resolution);
    return child;
  }

  cutoffSelect (cutoff: number): Individual {
    const theChosenOne = Math.floor(Math.random() * cutoff * this.individuals.length);
    return this.individuals[theChosenOne];
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

  getFittest (): Individual {
    return this.individuals[0];
  }
}
