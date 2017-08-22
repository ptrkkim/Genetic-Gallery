// @flow
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

export const makeTick = (population, offCanvas, outCtx, offCtx, resolution) =>
  () => {
    const t0 = performance.now();
    outCtx.clearRect(0, 0, resolution, resolution);
    offCtx.clearRect(0, 0, resolution, resolution);
    population.evolveNextGen();

    const fittest = population.getFittest();
    fittest.draw(offCtx, resolution);
    outCtx.drawImage(offCanvas, 0, 0, resolution, resolution);

    const t1 = performance.now();
    console.log(`generation took ${t1 - t0} ms`);
  };
