import {
  GET_NOTICE,
  GET_NEW_FAMILYS,
  GET_THANKS_LETTERS,
} from "../_actions/types";

const homeReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GET_NOTICE:
      return { ...state, notification: action.payload };
    case GET_NEW_FAMILYS:
      return { ...state, newFamilys: action.payload };
    case GET_THANKS_LETTERS:
      return { ...state, thanksLetters: action.payload };
    default:
      return state;
  }
};

export default homeReducer;
