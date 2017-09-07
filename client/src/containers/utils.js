// @flow
import type { Population } from '../algorithm/population';

export const makeCanvases = (fitRes: number, fullRes: number) => {
  const refCanvas = document.createElement('canvas');
  refCanvas.width = fitRes;
  refCanvas.width = fitRes;

  const fitCanvas = document.createElement('canvas');
  fitCanvas.width = fitRes;
  fitCanvas.height = fitRes;

  const offCanvas = document.createElement('canvas');
  offCanvas.width = fullRes;
  offCanvas.height = fullRes;

  return [refCanvas, fitCanvas, offCanvas];
};

export const getContexts = (canvArr: HTMLCanvasElement[]): CanvasRenderingContext2D[] =>
  canvArr.map(canvas => canvas.getContext('2d'));

export const createBackdrop = (color: string, size: number) => {
  const backdrop = document.createElement('canvas');
  backdrop.width = size;
  backdrop.height = size;

  const ctx = backdrop.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, backdrop.width, backdrop.height);

  return backdrop.toDataURL();
};

export const makeTicker = (
  population: Population,
  offCanvas: HTMLCanvasElement,
  outCtx: CanvasRenderingContext2D,
  offCtx: CanvasRenderingContext2D,
  resolution: number,
  ) => () => {
    // const t0 = performance.now();
    outCtx.clearRect(0, 0, resolution, resolution);
    offCtx.clearRect(0, 0, resolution, resolution);
    population.evolveNextGen();

    const fittest = population.getFittest();
    fittest.draw(offCtx, resolution);
    outCtx.drawImage(offCanvas, 0, 0, resolution, resolution);

    // const t1 = performance.now();
    // console.log(`generation took ${t1 - t0} ms`);
  };
