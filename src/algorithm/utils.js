// @flow
export function clamp (min: number, max: number, value: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export function mutateValBy(value: number, mutateAmt: number): number {
  let delta = 0;
  for (let i = 0; i < 4; i++) {
    delta += (Math.random() * mutateAmt * 2) - mutateAmt;
  }
  return value + delta;
}

export function getPixels(canvasCtx: CanvasRenderingContext2D, dimensions: number) {
  return canvasCtx.getImageData(0, 0, dimensions, dimensions).data;
}
