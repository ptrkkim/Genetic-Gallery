// @flow
const SORT_BY = 'SORT_BY';
const ADD_IMAGES = 'ADD_IMAGES';

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
};

// + denotes immutability
type sortAction = { +type: 'SORT_BY', +images: image[], sortOrder: string };
type addAction = { +type: 'ADD_IMAGES', +images: image[] };

type Action =
  | sortAction
  | addAction;

export const sortBy = (images: image[], sortOrder: string): sortAction => (
  { type: SORT_BY, images, sortOrder }
);
export const addImages = (images: image[]): addAction => (
  { type: ADD_IMAGES, images }
);

export const getMoreImages = (page: number, sortOrder: string) =>
  (dispatch: mixed => void) =>
    fetch(`/api/images/${page}/${sortOrder}`)
      .then(response => response.json())
      .then((foundPairs) => {
        dispatch(addImages(foundPairs));
      });

const initialState = {
  imagePairs: [],
  sortBy: 'new',
};

function galleryReducer (state: State = initialState, action: Action): State {
  switch (action.type) {
    case SORT_BY:
      return { ...state, imagePairs: action.images, sortBy: action.sortOrder };
    case ADD_IMAGES:
      return {
        ...state,
        imagePairs: [...state.imagePairs, ...action.images],
      };
    default:
      return state;
  }
}

export default galleryReducer;
