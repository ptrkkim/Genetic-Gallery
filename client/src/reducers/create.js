// @flow
import fullstackLogo from '../images/fullstack.png';
import type { Population } from '../algorithm/population';


const SET_TICKER = 'SET_TICKER';
const SET_POPULATION = 'SET_POPULATION';
const SET_IMAGES = 'SET_IMAGES';

// ? means nullable value
type State = {
  ticker: ?() => void,
  population: ?Population,
  originalSrc: string,
  artSrc: string,
};

// + denotes immutability
type tickerAction = { +type: 'SET_TICKER', ticker: () => void };
type popAction = { +type: 'SET_POPULATION', population: Population };
type srcAction = { +type: 'SET_IMAGES', originalSrc: string, artSrc: string };

type Action =
  | tickerAction
  | popAction
  | srcAction;

export const setTicker = (ticker: () => void) => ({ type: SET_TICKER, ticker });
export const setPop = (population: Population) => ({ type: SET_POPULATION, population });
export const setImages = (originalSrc: string, artSrc: string) => (
  { type: SET_IMAGES, originalSrc, artSrc }
);

const initialState = {
  ticker: null,
  population: null,
  originalSrc: fullstackLogo,
  artSrc: '',
};

function createReducer (state: State = initialState, action: Action): State {
  switch (action.type) {
    case SET_TICKER:
      return {
        ...state,
        ticker: action.ticker,
      };
    case SET_POPULATION:
      return {
        ...state,
        population: action.population,
      };
    case SET_IMAGES:
      return {
        ...state,
        originalSrc: action.originalSrc,
        artSrc: action.artSrc,
      };
    default:
      return state;
  }
}

export default createReducer;
