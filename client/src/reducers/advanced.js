// @flow
const SET_DEFAULT = 'SET_DEFAULT';
const SET_SIZE = 'SET_SIZE';
const SET_POLYGONS = 'SET_POLYGONS';
const SET_VERTICES = 'SET_VERTICES';
const SET_CROSSOVER = 'SET_CROSSOVER';
const SET_MUT_CHANCE = 'SET_MUT_CHANCE';
const SET_MUT_AMOUNT = 'SET_MUT_AMOUNT';

// ? means nullable value
type State = {
  size: number,
  polygonsPer: number,
  numVertices: number,
  crossoverChance: number,
  mutateChance: number,
  mutateAmount: number,
};

// + denotes immutability
type sizeAction = { +type: 'SET_SIZE', size: number };
type polygonAction = { +type: 'SET_POLYGONS', polygons: number };
type verticesAction = { +type: 'SET_VERTICES', vertices: number };
type xoverAction = { +type: 'SET_CROSSOVER', crossover: number };
type mutChanceAction = { +type: 'SET_MUT_CHANCE', chance: number };
type mutAmountAction = { +type: 'SET_MUT_AMOUNT', amount: number };

type Action =
  | sizeAction
  | polygonAction
  | verticesAction
  | xoverAction
  | mutChanceAction
  | mutAmountAction;

export const setSize = (size: number) => ({ type: SET_SIZE, size });
export const setPolygons = (polygons: number) => ({ type: SET_POLYGONS, polygons });
export const setVertices = (vertices: number) => ({ type: SET_VERTICES, vertices });
export const setCrossover = (crossover: number) => ({ type: SET_CROSSOVER, crossover });
export const setMutaChance = (chance: number) => ({ type: SET_MUT_CHANCE, chance });
export const setMutaAmount = (amount: number) => ({ type: SET_MUT_AMOUNT, amount });

const initialState = {
  size: 50,
  polygonsPer: 75,
  numVertices: 3,
  crossoverChance: 0.3,
  mutateChance: 0.01,
  mutateAmount: 0.1,
};

function advancedReducer (state: State = initialState, action: Action): State {
  switch (action.type) {
    case SET_DEFAULT:
      return initialState;
    case SET_SIZE:
      return { ...state, size: action.size };
    case SET_POLYGONS:
      return { ...state, polygonsPer: action.polygons };
    case SET_VERTICES:
      return { ...state, numVertices: action.vertices };
    case SET_CROSSOVER:
      return { ...state, crossoverChance: action.crossover };
    case SET_MUT_CHANCE:
      return { ...state, mutateChance: action.chance };
    case SET_MUT_AMOUNT:
      return { ...state, mutateAmount: action.amount };
    default:
      return state;
  }
}

export default advancedReducer;
