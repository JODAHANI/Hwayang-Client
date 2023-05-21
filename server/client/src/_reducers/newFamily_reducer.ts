import { GET_NEW_FAMILY, COMBINE_NEW_FAMILYS } from "_actions/types";

const letterReducer = (state = { allNewFamily: [] }, action: any) => {
  switch (action.type) {
    case GET_NEW_FAMILY:
      return { ...state, newFamily: action.payload };
    case COMBINE_NEW_FAMILYS:
      const copyAllLetters = [...state.allNewFamily, ...action.payload];
      state.allNewFamily = copyAllLetters;
      return { ...state };
    default:
      return state;
  }
};

export default letterReducer;
