// @flow
const SORT_BY = 'SORT_BY';
const ADD_IMAGES = 'ADD_IMAGES';
const LOADING = 'LOADING';
const NO_MORE = 'NO_MORE';
const POST_ONE = 'POST_ONE';

type image = {
  id: string,
  title: string,
  artist: string,
  artImg: string,
  originalImg: string,
  createdAt: string,
};

type State = {
  imagePairs: image[],
  sortBy: string,
  isLoading: boolean,
  hasMore: boolean,
  page: number,
};

// + denotes immutability
type sortAction = { +type: 'SORT_BY', +images: image[], sortOrder: string };
type addAction = { +type: 'ADD_IMAGES', +images: image[] };
type postOneAction = { +type: 'POST_ONE', +image: image };
type loadAction = { +type: 'LOADING' };
type moreAction = { +type: 'NO_MORE' };

type Action =
  | sortAction
  | addAction
  | loadAction
  | moreAction
  | postOneAction;

export const sortBy = (images: image[], sortOrder: string): sortAction => (
  { type: SORT_BY, images, sortOrder }
);

export const addImages = (images: image[]): addAction => (
  { type: ADD_IMAGES, images }
);

export const postOne = (imagePair: image): postOneAction => (
  { type: POST_ONE, image: imagePair }
);

export const loading = (): loadAction => ({ type: LOADING });
export const noMoreImages = (): moreAction => ({ type: NO_MORE });

export const getMoreImages = (page: number, sortOrder: string) =>
  (dispatch: mixed => void) => {
    dispatch(loading());
    return fetch(`/api/images/${page}/${sortOrder}`)
      .then(response => response.json())
      .then((foundPairs) => {
        if (foundPairs.length) {
          dispatch(addImages(foundPairs));
        } else {
          dispatch(noMoreImages());
        }
      });
  };


const initialState = {
  imagePairs: [],
  sortBy: 'new',
  isLoading: false,
  hasMore: true,
  page: 0,
};

function galleryReducer (state: State = initialState, action: Action): State {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case NO_MORE:
      return { ...state, isLoading: false, hasMore: false };
    case POST_ONE:
      return {
        ...state,
        imagePairs: [],
        sortBy: 'new',
        page: 0,
      };
    case SORT_BY:
      return {
        ...state,
        imagePairs: action.images,
        sortBy: action.sortOrder,
        page: 1,
      };
    case ADD_IMAGES:
      return {
        ...state,
        imagePairs: [...state.imagePairs, ...action.images],
        isLoading: false,
        page: state.page + 1,
      };
    default:
      return state;
  }
}

export default galleryReducer;
