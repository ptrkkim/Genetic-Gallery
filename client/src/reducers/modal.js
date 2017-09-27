// @flow
const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';

// + denotes immutability
type State = {
  +show: boolean,
};

type showAction = { +type: 'SHOW_MODAL' };
type hideAction = { +type: 'HIDE_MODAL' };

type Action =
  | showAction
  | hideAction;

export const showModal = (): showAction => ({ type: SHOW_MODAL });
export const hideModal = (): hideAction => ({ type: HIDE_MODAL });


const initialState = {
  show: false,
};

function modalReducer (state: State = initialState, action: Action): State {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, show: true };
    case HIDE_MODAL:
      return { ...state, show: false };
    default:
      return state;
  }
}

export default modalReducer;
